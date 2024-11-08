github-bulk
=================

A CLI tool to perform bulk operations through GitHub APIs.

It will progressively be updated as more features are needed, currently available:
 - Update repository custom properties

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/github-bulk.svg)](https://npmjs.org/package/github-bulk)
[![Downloads/week](https://img.shields.io/npm/dw/github-bulk.svg)](https://npmjs.org/package/github-bulk)


<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g github-bulk
$ github-bulk COMMAND
running command...
$ github-bulk (--version)
github-bulk/0.9.1 darwin-arm64 node-v22.11.0
$ github-bulk --help [COMMAND]
USAGE
  $ github-bulk COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`github-bulk help [COMMAND]`](#github-bulk-help-command)
* [`github-bulk plugins`](#github-bulk-plugins)
* [`github-bulk plugins add PLUGIN`](#github-bulk-plugins-add-plugin)
* [`github-bulk plugins:inspect PLUGIN...`](#github-bulk-pluginsinspect-plugin)
* [`github-bulk plugins install PLUGIN`](#github-bulk-plugins-install-plugin)
* [`github-bulk plugins link PATH`](#github-bulk-plugins-link-path)
* [`github-bulk plugins remove [PLUGIN]`](#github-bulk-plugins-remove-plugin)
* [`github-bulk plugins reset`](#github-bulk-plugins-reset)
* [`github-bulk plugins uninstall [PLUGIN]`](#github-bulk-plugins-uninstall-plugin)
* [`github-bulk plugins unlink [PLUGIN]`](#github-bulk-plugins-unlink-plugin)
* [`github-bulk plugins update`](#github-bulk-plugins-update)
* [`github-bulk repo properties [FILE]`](#github-bulk-repo-properties-file)

## `github-bulk help [COMMAND]`

Display help for github-bulk.

```
USAGE
  $ github-bulk help [COMMAND...] [-n]

ARGUMENTS
  COMMAND...  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for github-bulk.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v6.2.16/src/commands/help.ts)_

## `github-bulk plugins`

List installed plugins.

```
USAGE
  $ github-bulk plugins [--json] [--core]

FLAGS
  --core  Show core plugins.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ github-bulk plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.15/src/commands/plugins/index.ts)_

## `github-bulk plugins add PLUGIN`

Installs a plugin into github-bulk.

```
USAGE
  $ github-bulk plugins add PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Force npm to fetch remote resources even if a local copy exists on disk.
  -h, --help     Show CLI help.
  -s, --silent   Silences npm output.
  -v, --verbose  Show verbose npm output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into github-bulk.

  Uses npm to install plugins.

  Installation of a user-installed plugin will override a core plugin.

  Use the GITHUB_BULK_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the GITHUB_BULK_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ github-bulk plugins add

EXAMPLES
  Install a plugin from npm registry.

    $ github-bulk plugins add myplugin

  Install a plugin from a github url.

    $ github-bulk plugins add https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ github-bulk plugins add someuser/someplugin
```

## `github-bulk plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ github-bulk plugins inspect PLUGIN...

ARGUMENTS
  PLUGIN...  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ github-bulk plugins inspect myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.15/src/commands/plugins/inspect.ts)_

## `github-bulk plugins install PLUGIN`

Installs a plugin into github-bulk.

```
USAGE
  $ github-bulk plugins install PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Force npm to fetch remote resources even if a local copy exists on disk.
  -h, --help     Show CLI help.
  -s, --silent   Silences npm output.
  -v, --verbose  Show verbose npm output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into github-bulk.

  Uses npm to install plugins.

  Installation of a user-installed plugin will override a core plugin.

  Use the GITHUB_BULK_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the GITHUB_BULK_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ github-bulk plugins add

EXAMPLES
  Install a plugin from npm registry.

    $ github-bulk plugins install myplugin

  Install a plugin from a github url.

    $ github-bulk plugins install https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ github-bulk plugins install someuser/someplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.15/src/commands/plugins/install.ts)_

## `github-bulk plugins link PATH`

Links a plugin into the CLI for development.

```
USAGE
  $ github-bulk plugins link PATH [-h] [--install] [-v]

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help          Show CLI help.
  -v, --verbose
      --[no-]install  Install dependencies after linking the plugin.

DESCRIPTION
  Links a plugin into the CLI for development.

  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ github-bulk plugins link myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.15/src/commands/plugins/link.ts)_

## `github-bulk plugins remove [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ github-bulk plugins remove [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ github-bulk plugins unlink
  $ github-bulk plugins remove

EXAMPLES
  $ github-bulk plugins remove myplugin
```

## `github-bulk plugins reset`

Remove all user-installed and linked plugins.

```
USAGE
  $ github-bulk plugins reset [--hard] [--reinstall]

FLAGS
  --hard       Delete node_modules and package manager related files in addition to uninstalling plugins.
  --reinstall  Reinstall all plugins after uninstalling.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.15/src/commands/plugins/reset.ts)_

## `github-bulk plugins uninstall [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ github-bulk plugins uninstall [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ github-bulk plugins unlink
  $ github-bulk plugins remove

EXAMPLES
  $ github-bulk plugins uninstall myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.15/src/commands/plugins/uninstall.ts)_

## `github-bulk plugins unlink [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ github-bulk plugins unlink [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ github-bulk plugins unlink
  $ github-bulk plugins remove

EXAMPLES
  $ github-bulk plugins unlink myplugin
```

## `github-bulk plugins update`

Update installed plugins.

```
USAGE
  $ github-bulk plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.15/src/commands/plugins/update.ts)_

## `github-bulk repo properties [FILE]`

Update Repositories custom properties in bulk

```
USAGE
  $ github-bulk repo properties [FILE] -m <value> -t <value> [-a] [-i <value>]

ARGUMENTS
  FILE  file to read

FLAGS
  -a, --assistance           Show some extra assistance in using this command
  -i, --input=<value>        Path to a CSV file containing the data to update in batch
  -m, --multiSelect=<value>  (required) Case sensitive comma separated values of properties that are not strings
  -t, --token=<value>        (required) GitHub personal API token with scopes needed for the operation

DESCRIPTION
  Update Repositories custom properties in bulk

EXAMPLES
  $ github-bulk repo properties
```

_See code: [src/commands/repo/properties.ts](https://github.com/fgerthoffert/github-bulk/blob/v0.9.1/src/commands/repo/properties.ts)_
<!-- commandsstop -->
