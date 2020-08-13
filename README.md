
![](https://github.com/moonshot-partners/i18n-fast-translate/workflows/Node.js%20CI/badge.svg?branch=master) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)



![image](https://user-images.githubusercontent.com/4649902/90065414-ddfeb200-dcb1-11ea-97d4-6673f0e4034a.png)

# I18n Fast Translate 
> an easy way to translate the I18n files
![fast](https://user-images.githubusercontent.com/4649902/90066226-1488fc80-dcb3-11ea-97a8-c33d4433ea4c.gif)

- :star: easy to integrate 
- :boom: translates i18n files with one command 
- :open_hands: supports multiples providers

## Content

- [Installation](#installation)
- [Usage](#usage)
- [Providers](#providers)
- [Configuration](#configuration)


## Installation

```bash 
npm install -g @moonshot-partners/i18n-fast-translate
```

or

```bash 
npm install i18n-fast-translate --save-dev
```

## Usage

you have to create a configuration file in the root of your project

```bash
touch .fast-translate.json
```

```js
{
  "base": "translations/en-us.json", // translation base
  "format": "json", // we only support json and yaml
  "onlyMissingKeys": true, // translate only if the target doesn't have the key from the i18n base
  "provider": "google" // translation service
  "translates": [ // target files: target = file path, to: translate language
    { "target": "translations/es.json", "to": "es" },
    { "target": "translations/pt-br.json", "to": "pt" }
  ]
```

then you can run `fast-translate` and it translates all the files automatically
```bash
fast-translate
```

## Providers

### Google
to default we use google cloud to translates the files, in order to it works fine you have to set up this env

**Env:**
```bash
export GOOGLE_APPLICATION_CREDENTIALS="your key path"
```

you can find more information about this [here](https://cloud.google.com/docs/authentication/getting-started#setting_the_environment_variable)

**Config key**

```json
{ "provider": "google" }
```

### Google Legacy

if you are using the old API you can use this provider
**Env:**
```bash
export GOOGLE_TRANSLATE_V2_API_KEY="YOUR API KEY"
```

**Config key**

```json
{ "provider": "google" }
```

### Configuration

**.fast-translation.json**

```js
{
  "base": "translations/en-us.json", // translation base
  "format": "json", // we only support json and yaml
  "onlyMissingKeys": true, // translate only if the target doesn't have the key from the i18n base
  "commit": true, //  send a git commit when it finishes to translates the files
  "provider": "google" // translation service
  "translates": [ // target files: target = file path, to: translate language
    { "target": "translations/es.json", "to": "es" },
    { "target": "translations/pt-br.json", "to": "pt" }
  ]
```
