import { NearBindgen, near, call, view, Vector } from 'near-sdk-js'
import { Suggestion } from './model'

@NearBindgen({})
class NYCSuggestions {
  messages: Vector<Suggestion> = new Vector<Suggestion>("v-uid");

  @call({ payableFunction: false })
  // Public - Adds a new message.
  add_message({ text }: { text: string }) {
    const message: Suggestion = { text };
    this.messages.push(message);
  }

  @view({})
  // Returns an array of messages.
  get_messages({}): Suggestion[] {
    return this.messages.toArray();
  }
  
  @call({ payableFunction:false })
  clear_messages({}) {
    this.messages = new Vector<Suggestion>("v-uid");
  }

  @view({})
  total_messages(): number { return this.messages.length }

}
