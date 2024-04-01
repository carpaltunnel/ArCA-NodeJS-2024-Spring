# OpenAPI (and Swagger)
> The OpenAPI Specification (OAS) defines a standard, language-agnostic interface to RESTful APIs which allows both humans and computers to discover and understand the capabilities of the service without access to source code, documentation, or through network traffic inspection. When properly defined, a consumer can understand and interact with the remote service with a minimal amount of implementation logic.

The OpenAPI Specification defines how we'll describe and document our API while Swagger provides a convenient UI/interpreter that is easy to use and navigate.  It supports both JSON and YAML type definitions.  We'll stick to JSON since we're using it everywhere else but will show a YAML comparison because the YAML definition is a bit more brief and easy to use.  We're only going to cover the required and extremely common fields for now.

## OpenAPI Documents
The OpenAPI spec defines the following required top level fields : 
1.  `openapi` - The OpenAPI spec version the document adheres to
2.  `info` - Metadata about the API (title, description, version)
3.  `paths` - Available paths and operations in the API

The following top level fields are optional : 
1. `servers` - Array of server objects that define where the API is found
2. `components` - Defines the schemas and other reusables in the spec
3. `security` - Definition of the security mechanisms used in the API
4. `tags` - Object that defines the tags used in the API with descriptions
5. `externalDocs` - Additional external documentation

### *Info
The `info` object supports the following properties where required fields are marked with an asterisk (*) :
1. `*title` - Title of the API
2. `description` - Short description of the API
3. `termsOfService` - URL (only a URL) to the terms of service
4. `contact` - Contact information for the API company/team
5. `license` - API license
6. `*version` - API version.  Not the OpenAPI version, the version of the API being described

### Components
The `components` section contains reusable blocks of definitions for (re)use elsewhere in our spec.  This is a great place to store things like schemas, requestBodies, responses, and parameters that will be used multiple times in the spec.  By defining them here, then referencing them with `$ref` we can change a definition in a single location and know that it will be auto propagated to all other places where it is used.  If you need to maintain a single monolithic document, this is the place to put all your standard components.  However, you can make your spec shorter and easier to read by defining these in other files to keep everything separate.

#### Schemas
The `schema` object defines data types in your spec.  This is an extended subset of the JSON Schema that we have looked at previously and functions generally the same.

The following are taken directly from the JSON Schema spec and function the same : 
1. title
2. multipleOf
3. maximum
4. exclusiveMaximum
5. minimum
6. exclusiveMinimum
7. exclusiveMaximum
8. maxLength
9. minLength
10. pattern (regex)
11. maxItems
12. minItems
13. uniqueItems
14. maxProperties
15. minProperties
16. required
17. enum

These properties are taken from the JSON Schema spec but have a slightly different definition :
1. type - String, only a single value is supported
2. allOf - Inline or referenced schema must be an OpenAPI Schema object, not a JSON Schema
3. oneOf - Same as above
4. anyOf - Same as above
5. not - Same as above
6. items - Must be an object, not an array.  Schema must be an OpenAPI Schema object, not a JSON Schema
7. properties - Schema must be an OpenAPI Schema object, not a JSON Schema
8. additionalProperties - Boolean or object.  If object, must be an OpenAPI schema object
9. description - May contain CommonMark syntax
10. format - OpenAPI offers a few extra formats compared to JSON schema
11. default - Must match the `type` of this schema

There are a few additional properties added by OpenAPI but, since we want to keep our schemas compliant with the JSON Schema spec for validation, I'm going to ignore them.

#### Parameters
The Parameters object defines the parameters that are accepted by and endpoint and their location :
1. `*name` - Name of the parameter (case sensitive)
2. `*in` - Where the parameter is found.  Valid values are : query, header, path, cookie
3. `*required` - Indicates if the parameter is required
4. `description`
5. `deprecated` - Indicates if a parameter is deprecated
6. `allEmptyValue` - This is only valid for query parameters that do not require a value, only a presence (boolean).  Empty query parameters are generally discouraged due to differing support in frameworks so this should also be avoided if possible.

#### Headers 
The header object has the same structure as the Parameters object with minor changes : 
1. `name` must not be specified, it is taken from the `headers` key
2. `in` must not be specified since we're explicitly defining headers so... they'll be in the header.
3. All traits affected by location must adhere to a header


#### Request Bodies
The request body object defines the possible request body types and contents that can be supplied to an endpoint.  The request body object itself is quite simple with all the body definition being done in the `content` nested Media Type object.  The base properties are : 
1. `description`
2. `required`
3. `content` - Map of media type keys where the value describes it.

#### Media Type
The media type object, defined by the `content` keys, provides a schema and examples that define the associated request body.  Available properties are : 
1. `schema` - Obviously the most important, this is a Schema type object that defines the body
2. `example` - A request body example that adheres to the `schema`
3. `examples` - Same as `example`, but an array with multiple examples
4. `encoding` - Object to define the various encoding types

#### Responses
Responses follow the same general structure as request bodies with the following properties : 
1. `*description`
2. `headers`
3. `content` - Map of content types where the value defines the schema (same as request)
4. `links` - Map of operations links

### Paths
Paths example containing parameters and responses.  You can extrapolate the `requestBodies` structure from the `responses` object.
```json
"paths": {
  "/widgets/{id}": {
        "get": {
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Get a widget by ID",
              "content": {
                "application/json": {
                  "schema": {
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
                      }
                    }
                  }
                }
              }
            }
          }
        }
    }
}
```

### References
We discussed the ability to reference other objects in the Components portion.  The following is an example of how to do this in a single document, assuming the `widget` schema is defined in `components/schemas` :
```json
"paths": {
  "/widgets/{id}": {
      "get": {
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Get a widget by ID",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/widget"
                }
              }
            }
          }
        }
      }
  }
}
```

Much cleaner, yes?

### Split Schema
A way to make your documentation files smaller and easier to manage is to split your components across multiple files.  For example, instead of defining all of the schemas in the `components` object, you could create a separate file dedicated to each individual schema.  Each separate file must adhere to the OpenAPI/Swagger requirements but can contain only the schema associated with the filename.  As an example, let's separate the `widget` schema into a dedicated file at `./schemas/widget.json`.


```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "http://myapplication/widget.json",
  "openapi": "3.0.1",
  "info": {
    "title": "Widget",
    "version": "3.0.1"
  },
  "paths": {},
  "components": {
    "schemas": {
      "widget": {
        // Widget schema is copied to here
      }
    }
  }
}
```

Now, let's reference it in the `components/schemas` section of our original document : 
```json
{
  "openapi": "3.0.1",
  "info": {
    "title": "Widgets App",
    "description": "This is a sample API for widgets",
    "version": "3.0.1"
  },
  "components": {
    "schemas": {
      "widget": {
        "$ref": "schemas/widget.json#/components/schemas/widget"
      }
    }
  }
}
```

Now, if the `widget` definition needs to change we can edit it in a single dedicated file (much smaller and easier to read) and the changes will propagate to every location it is referenced.

## Testing
The [Swagger Editor](https://editor.swagger.io/) is great for easy development and testing of single file specs but it can't natively handle specifications that are split across multiple files.  The [Swagger UI](https://petstore.swagger.io/) can, but only if those files are publicly available on the internet.  You could host it on Github or some other public location, but for local-only development we need a few more steps.

One of the easiest ways is to install the NPM module [http-server](https://www.npmjs.com/package/http-server) and run [Swagger UI](https://swagger.io/tools/swagger-ui/download/) locally.  Start Swagger UI with `npm start`.  Then, `cd` to the directory that contains your OpenAPI documents and execute `http-server --cors -a 127.0.0.1`.  Now, access the local Swagger UI at `http://127.0.0.1:3002` and point it to `http://127.0.0.1:8080/your-spec-file.json`.  Swagger UI will download the base OpenAPI spec, follow any references, and present it as a single document.