class FSM {

    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
      if (config === undefined) {
        throw new Error("Need config");
      }
      this.config = config;
      this.states = this.config.states;
      this.curState = config.initial;
      this.nextState = null;
      this.prevState = null;
      this.statesOfEvent;
    }

    /**
     * Returns active state.!
     * @returns {String}
     */
    getState() {
      return this.curState;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
      if (this.states.hasOwnProperty(state)) {
        this.prevState = this.curState;
        this.curState = state;
      } else {
        throw new Error("This state does not exist");
      }
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
      if (this.states[this.curState].transitions.hasOwnProperty(event)) {
        this.prevState = this.curState;
        this.curState = this.states[this.curState].transitions[event];
      } else {
        throw new Error("This event does not exist in the state");
      }
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
      this.curState = this.config.initial;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
      if ( event === undefined) {
        return Object.keys(this.states);
      }
      this.statesOfEvent = [];
      for (var prop in this.states) {
        if (this.states.hasOwnProperty(prop)) {
          if (this.states[prop].transitions.hasOwnProperty(event)) {
            this.statesOfEvent.push(prop);
          }
        }
      }
      return this.statesOfEvent;
    }
      //
    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
      if (!this.prevState) {
        return false;
      }
      this.nextState = this.curState;
      this.curState = this.prevState;
      this.prevState = null;
      return true;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
      if (!this.nextState) {
        return false;
      }
      this.prevState = this.curState;
      this.curState = this.nextState;
      this.nextState = null;
      return true;
    }

    /**
     * Clears transition history
     */
    clearHistory() {
      this.prevState = null;
      this.nextState = null;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
