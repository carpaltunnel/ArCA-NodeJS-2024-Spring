const Ajv = require('ajv');
const addFormats = require('ajv-formats');
const ajv = new Ajv();

addFormats(ajv);
const widgetSchema = require('./schemas/widget.json');

const exampleData = {
  id: 'fd12037c-c56a-4f23-9d18-04b251e1be63',
  name: 'Blue Widget',
  color: 'blue',
  weight: 10,
  tags: ['tag1', 'tag2', 'tag3'],
  tracking: {
    lastUpdated: '2021-06-05T19:49:25.727Z',
    lastUpdatedBy: 'user3'
  }
};

const validate = ajv.compile(widgetSchema);
const valid = validate(exampleData);

if (!valid) {
  console.error('Error validating input data against the JSON Schema');
  console.error(validate.errors);
} else {
  console.log('No validation errors - looks good!');
}