# JSON Schema
JSON Schema is a way to define the expected structure of a JSON document - perfect for documenting and validating requests and responses in a web app.  Ideally you would define your schema before implementing an API but you can also easily describe existing structures. 

## Writing Schemas
A JSON Schema starts with the definition of the schema and indicates the version, identifier, and some descriptive properties.
```json
{
  "$schema": "https://json-schema.org/draft-07/schema",
  "$id": "https://my-app-domain/schemas/widgets",
  "title": "Widget",
  "description": "A widget available",
  "type": "object",
  "properties": {}
}
```

Let's assume the following widget structure : 
```javascript
{
  id: 'fd12037c-c56a-4f23-9d18-04b251e1be63',
  name: 'Blue Widget',
  color: 'blue',
  weight: 10,
  tags: ['tag1', 'tag2', 'tag3'],
  tracking: {
    lastUpdated: '2021-06-05T19:49:25.727Z',
    lastUpdatedBy: 'user3'
  }
}
```

The types are obvious in this example but there might be other constraints that are not as clear.  For example, we'll apply the following restrictions :
1. `id` is a required field and must be a UUID
2. `name` is a required field and must have three or more characters
3. `color` can only be "red", "green", or "blue"
4. `weight` must be a number between 1 and 25
5. `tags` is an array if present, but is not a required field
6. `tracking.lastUpdated` must be a date time type

## Formats
For validation past basic Javascript types (string, integer, array, object, etc) we can include the [Ajv Formats module](https://github.com/ajv-validator/ajv-formats).  It supports the following format validators : 
1. date: full-date according to RFC3339.
2. time: time with optional time-zone.
3. date-time: date-time from the same source (time-zone is mandatory).
4. duration: duration from RFC3339
5. uri: full URI.
6. uri-reference: URI reference, including full and relative URIs.
7. uri-template: URI template according to RFC6570
8. url (deprecated): URL record.
9. email: email address.
10. hostname: host name according to RFC1034.
11. ipv4: IP address v4.
12. ipv6: IP address v6.
13. regex: tests whether a string is a valid regular expression by passing it to RegExp constructor.
14. uuid: Universally Unique IDentifier according to RFC4122.
15. json-pointer: JSON-pointer according to RFC6901.
16. relative-json-pointer: relative JSON-pointer according to this draft.
17. byte: base64 encoded data according to the openApi 3.0.0 specification
18. int32: signed 32 bits integer according to the openApi 3.0.0 specification
19. int64: signed 64 bits according to the openApi 3.0.0 specification
20. float: float according to the openApi 3.0.0 specification
21. double: double according to the openApi 3.0.0 specification
22. password: password string according to the openApi 3.0.0 specification
23. binary: binary string according to the openApi 3.0.0 specification


Now, we'll write the schema that defines these requirements.  The first settings are the same as discussed above, then we'll add our logic under the "properties" key.
```json
{
  "$schema": "https://json-schema.org/draft-07/schema",
  "$id": "https://my-app-domain/schemas/widgets",
  "title": "Widget",
  "description": "A widget",
  "type": "object",
  "properties": {
    "id": {
      "description": "Unique identifier for the widget",
      "type": "string",
      "format": "uuid"
    },
    "name": {
      "description": "Name of the widget that will be displayed to users",
      "type": "string",
      "minLength": 3
    },
    "color": {
      "description": "Item color",
      "type": "string",
      "enum": ["red", "green", "blue"]
    },
    "weight": {
      "description": "Item weight in kilograms",
      "type": "integer",
      "minimum": 1,
      "maximum": 25
    },
    "tags": {
      "description": "Item tags for searching",
      "type": "array"
    },
    "tracking": {
      "type": "object",
      "properties": {
        "lastUpdated": {
          "description": "ISO8601 Date this widget was last updated",
          "type": "string",
          "format": "date-time"
        },
        "lastUpdatedBy": {
          "description": "User ID that last updated the widget",
          "type": "string"
        }
      }
    }
  },
  "required": ["id", "name"]
}
```

## Usage
The great part about this is by writing a single schema we have both written documentation AND our validation logic.  Rather than writing a lot of code to check the type and requirements for each field, we can simply feed the user input and the schema to a validator and be done.  [Ajv](https://ajv.js.org) is a fast and easy to use JSON schema validator.  In newer versions the "format" property has been separated into a [different module](https://github.com/ajv-validator/ajv-formats) that must be installed, required, and added to the Ajv instance manually.

```javascript
const Ajv = require('ajv');
const addFormats = require('ajv-formats');
const ajv = new Ajv();
const widgetSchema = require('./schemas/widget.json');
// Add format support to Ajv
addFormats(ajv);


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
```