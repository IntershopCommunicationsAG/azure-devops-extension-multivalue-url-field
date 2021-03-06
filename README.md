This is a fork of the [azure-devops-extension-url-field extension](https://github.com/krypu/azure-devops-extension-url-field) that can create multiple URLs based on multi-value-field values.

# MultiValue URL Field - a custom work item control
## Azure DevOps extension

### Create
Install infos: https://docs.microsoft.com/en-us/azure/devops/extend/get-started/node?view=azure-devops
1. Set `publisher` in `vss-extension.json` 
2. `npm install vss-web-extension-sdk --save`
3. `npm install -g tfx-cli`
4. `npx tfx-cli extension create`
5. Publish this extention : https://marketplace.visualstudio.com/manage/publishers 

### Usage

This custom control allows you to add multiple clickable URL on your workitem form, that use another field as a variable in that URL. Depending on your needs, there are four different ways you can use this custom control extension:

1. A fixed static URL that is always the same for every workitem.
2. A dynamic URL that combines a static base URL with some parametres taken from an other field.
3. A manual URL that is fully based on an other field.
4. Multiple dynamic URLs that combines a static base URL with some values taken from an multi-value-field.

The typical scenario for this custom control is option number two, see the following example below:

Let's assume that in your Azure DevOps instance, you have a custom field on a bug form. It's a simple string field that stores a ServiceNow incident number. Then, you can create an URL Field that would combine your SN web address with this SN number, e.g.:

URL `https://company.service-now.com/nav_to.do?uri=incident.do?sysparm_query=number={field}`
Field `ServiceNow Incident`

When you open your work item, `{field}` will be replaced by a value from a selected field. Have a look at screenshots to see the output.

For scenario 1, you simple need to skip `{field}` in URL option, so nothing is replaced (a fixed link).
For scenario 3, you simple need to enter *only* `{field}` in URL option, so everything is replaced (a manual link, fully based on an another field).

### License

Licensed under the EUPL-1.2-or-later

Full text in 23 official languages is available at https://joinup.ec.europa.eu/collection/eupl/eupl-text-eupl-12

### Special thanks to

- Doug Bloch (https://github.com/dbloch3643) for an idea and implementation support on "Hide URL if Field is empty" functionality.