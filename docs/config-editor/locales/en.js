// Every interface string, by key (design system: Language). A new language is a translated
// copy of this file, loaded after it. Field names and values from the config are data, not interface text.
kBenestadFjord.i18n.add({
  "app.title": "Config editor",

  "source.address": "Config address",
  "source.addressHelp": "A web address, or one relative to this page.",
  "schema.title": "Schema (optional)",
  "schema.text": "A JSON Schema gives the fields names, help text, allowed values and limits. Without one, the editor shows the file as it is.",
  "schema.address": "Schema address",
  "schema.none": "No schema loaded.",
  "schema.loaded": "Schema loaded: {name}",

  "action.load": "Load",
  "action.openFile": "Open file",
  "action.removeSchema": "Remove schema",
  "action.save": "Save file",
  "action.keepEditing": "Keep editing",
  "action.discard": "Discard",
  "action.undo": "Undo",
  "action.addField": "Add field",
  "action.addItem": "Add item",
  "action.remove": "Remove {name}",

  "empty.title": "No config loaded",
  "empty.text": "Enter the address of a config file above, or open one from this computer.",

  "discard.title": "Discard your changes?",
  "discard.text": "Loading another file replaces what you have changed and not saved. This cannot be undone.",

  "field.name": "Field name",
  "item.label": "Item {n}",
  "value.null": "null",
  "type.string": "Text",
  "type.number": "Number",
  "type.boolean": "Switch",
  "type.object": "Group",
  "type.array": "List",
  "option.current": "{value} (not allowed)",

  "status.dirty": "Unsaved changes",
  "status.clean": "No changes",
  "toast.removed": "Removed {name}",
  "toast.saved": "Downloaded {name}",
  "toast.exists": "{name} already exists",
  "toast.badName": "Enter a field name that is not empty or reserved",

  "error.address": "That is not a valid address",
  "error.http": "The server answered {status}",
  "error.fetch": "Could not load {address}",
  "error.fetchHint": "Check the address and that you are online. A site you do not control must allow reading from other pages.",
  "error.parse": "That file is not valid JSON",
  "error.notObject": "The config must be a JSON object",
  "error.schemaNotObject": "The schema must be a JSON object",

  "problem.title": "Fix before saving",
  "problem.line": "{path}: {message}",
  "problem.more": "…and {count} more",
  "problem.root": "Config",
  "problem.number": "Enter a number",
  "problem.type": "Must be of type {type}",
  "problem.integer": "Must be a whole number",
  "problem.enum": "Must be one of: {values}",
  "problem.min": "Must be at least {min}",
  "problem.max": "Must be at most {max}",
  "problem.required": "Required",
  "problem.unknown": "Not allowed here"
});
