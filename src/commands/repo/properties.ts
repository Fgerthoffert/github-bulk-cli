import {Args, Command, Flags} from '@oclif/core'
import { parse } from 'csv-parse/sync'
import * as fs from 'node:fs';
import path from 'node:path';
import { Octokit } from "octokit";
import ttyTable from 'tty-table'


export default class RepoProperties extends Command {
  static override args = {
    file: Args.string({description: 'file to read'}),
  }

  static override description = 'Update Repositories custom properties in bulk'

  static override examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static override flags = {
    // flag with no value (-f, --force)
    assistance: Flags.boolean({char: 'a', description: 'Show some extra assistance in using this command'}),
    // flag with a value (-n, --name=VALUE)
    input: Flags.string({char: 'i', description: 'Path to a CSV file containing the data to update in batch'}),
    multiSelect: Flags.string({char: 'm', description: 'Case sensitive comma separated values of properties that are not strings', required: false, default: ''}),
    token: Flags.string({char: 't', description: 'GitHub personal API token with scopes needed for the operation', required: true}),
  }

  public async run(): Promise<void> {
    const {flags} = await this.parse(RepoProperties)

    if (flags.assistance === true) {
      this.log(`This command is used to update properties of multiple repositories in batch.`)
      this.log(`It takes as an input, a CSV file containing the following columns:`)
      this.log(`nameWithOwner: The full name of the repository with owner to be updated (e.g. zencrepes/zindexer)`)
      this.log(`COLUMN_NAME: The name of a property to update as it is defined in GitHub (e.g. Area), replace it with the actual property name you registered in GitHub`)

      const header = [{align: "left", value: "nameWithOwner", width: 20}, {align: "left", value: "Area", width: 20}, {align: "left", value: "Main Deps", width: 40}]
      const rows = [
        ["zencrepes/zindexer", "CLI", "oclif"],
        ["zencrepes/zapi", "API", "NestJS, Apollo"],
        ["zencrepes/zui", "UI", "React, Apollo"],
      ]
      const sampleTable = ttyTable(header, rows).render()
      this.log(sampleTable)
      this.log(`This will submit the following payload: ${JSON.stringify([
        {
          "property_name": "Area",
          "value": "CLI"
        },
        {
          "property_name": "Main Deps",
          "value": "oclif"
        }
      ])}`)
      this.log(`This will submit the following payload to: /repos/zencrepes/zindexer/properties/values`)
      this.log(` `)
      this.log(` `)
      this.log(`About Multi-select custom properties: `)
      this.log(`GitHub supports multi-select custom properties but the values must be submitted as an array of strings.`)
      this.log(`Sadly, there are no way (via the API) to determine the expected data type of a custom property.`)
      this.log(`If some of your data are multi-select, you must provide a list of these property names using the -m flag.`)
      this.log(`(e.g. Areas,Tools)`)

      // Documentation: https://docs.github.com/en/rest/reference/repos#update-a-repository

      return
    }   

    if (flags.input === undefined || flags.input === '') {
      this.error(`No input CSV file provided`)
    }

    this.log(`Initialize GitHub REST client`)
    const octokit = new Octokit({ auth: flags.token });

    this.log(`Opening up the CSV file: ${flags.input}`)
    let currentFilepath: string = ''
    if (fs.existsSync(path.join(process.cwd(), flags.input))) {
      currentFilepath = path.join(process.cwd(), flags.input)
    } else if (fs.existsSync(flags.input)) {
      currentFilepath = flags.input
    } else {
      this.error(`Unable to access file: ${flags.input}`)
    }

    const multiSelect = new Set(flags.multiSelect.split(',').map(value => value.trim())) 

    const csvData: CSVData[] = parse(fs.readFileSync(currentFilepath, 'utf8'), {
      columns: true,
      // eslint-disable-next-line camelcase
      skip_empty_lines: true
    })
    this.log(`The CSV file contains ${csvData.length} records`) 

    const propertyKeys = Object.keys(csvData[0]).filter(key => key !== 'nameWithOwner')
    this.log(`The following properties are present: ${propertyKeys.join(', ')}`) 

    for (const record of csvData) {
      const [owner, repo] = record.nameWithOwner.split('/')

      const updatedProperties = propertyKeys.map(key => {
        if (record[key] === '') {
          return {
            // eslint-disable-next-line camelcase
            property_name: key,
            value: null
          }
        }

        if (multiSelect.has(key)) {
          return {
            // eslint-disable-next-line camelcase
            property_name: key,
            value: record[key].split(',').map(value => value.trim())
          }
        }

        return {
          // eslint-disable-next-line camelcase
          property_name: key,
          value: record[key]
        }
      })      
      this.log(`[${record.nameWithOwner}] Submitting the following properties: ${JSON.stringify(updatedProperties)}`) 

      // eslint-disable-next-line no-await-in-loop
      await octokit.request(
        'PATCH /repos/{owner}/{repo}/properties/values', {
          headers: {
            'X-GitHub-Api-Version': '2022-11-28'
          },
          owner,
          properties: updatedProperties,
          repo,
        }
      )
    }
    
    this.log(`All records have been submitted`) 
  }
}
