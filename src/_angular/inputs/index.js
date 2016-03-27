import './input_text.css'

import registerRadiogroup from './radiogroup'
import registerInlineEdit from './inline_edit'

export default function registerInputs() {
  return this
    ::registerRadiogroup()
    ::registerInlineEdit()
}
