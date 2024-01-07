type EventListenerList = {
  addEventListener: (type: string, listener: EventListener) => void;
  addSingleUseListener: (type: string, listener: EventListener) => void;
  dispatchEvent: (type: string, event: Event) => void;
  getNumListenersForType: (type: string) => number;
  removeEventListener: (type: string, listener: EventListener) => void;
};

type PatchConnection = {
  /**
   * Attaches a listener function which will be called whenever the value of any parameter changes in the patch. The listener function will be called with an argument object with the fields endpointID and value.
   * @param listener
   * @returns
   */
  addAllParameterListener: (listener: (parameter: { endpointID: string; value: unknown }) => void) => void;
  /**
   * Attaches a listener function that will receive updates with the events or audio data that is being sent or received by an endpoint. If the endpoint is an event or value, the callback will be given an argument which is the new value. If the endpoint has the right shape to be treated as “audio” then the callback will receive a stream of updates of the min/max range of chunks of data that is flowing through it. There will be one callback per chunk of data, and the size of chunks is specified by the optional granularity parameter. If sendFullAudioData is false, the listener will receive an argument object containing two properties ‘min’ and ‘max’, which are each an array of values, one element per audio channel. This allows you to find the highest and lowest samples in that chunk for each channel. If sendFullAudioData is true, the listener’s argument will have a property ‘data’ which is an array containing one array per channel of raw audio samples data.
   * @param endpointId
   * @param listener
   * @param granularity
   * @param sendFullAudioData
   * @returns
   */
  addEndpointListener: (
    endpointId: string,
    listener: EventListener,
    granularity: number,
    sendFullAudioData: boolean
  ) => void;
  /**
   * Attaches a listener function which will be called whenever the value of a specific parameter changes. The listener function will be called with an argument which is the new value.
   * @param endpointID
   * @param listener
   * @returns
   */
  addParameterListener: <T>(endpointID: string, listener: (value: T) => void) => void;
  /**
   * Attaches a listener function that will be called whenever the patch’s status changes. The function will be called with a parameter object containing many properties describing the status, including whether the patch is loaded, any errors, endpoint descriptions, its manifest, etc.
   * @param listener
   * @returns
   */
  addStatusListener: (
    listener: (status: {
      details: {
        inputs: Array<any>;
      };
    }) => void
  ) => void;
  /**
   * Attaches a listener function that will be called when any key-value pair in the stored state is changed. The listener function will receive a message parameter with properties key and value.
   * @param listener
   * @returns
   */
  addStoredStateValueListener: (listener: EventListener) => void;
  deliverMessageFromServer: (msg: string) => void;
  getResourceAddress: (path: string) => string;
  /**
   * Removes a listener that was previously added with addAllParameterListener()
   * @param listener
   * @returns
   */
  removeAllParameterListener: (listener: EventListener) => void;
  /**
   * Removes a listener that was previously added with addEndpointListener()
   * @param endpointID
   * @param listener
   * @returns
   */
  removeEndpointListener: (endpointID: string, listener: EventListener) => void;
  /**
   * Removes a listener that was previously added with addParameterListener()
   * @param endpointID
   * @param listener
   * @returns
   */
  removeParameterListener: <T>(endpointID: string, listener: T) => void;
  /**
   * Removes a listener that was previously added with addStatusListener()
   * @param listener
   * @returns
   */
  removeStatusListener: <T>(listener: (value: T) => void) => void;
  /**
   * Removes a listener that was previously added with addStoredStateValueListener().
   * @param listener
   * @returns
   */
  removeStoredStateValueListener: (listener: EventListener) => void;
  /**
   * Asynchronously requests the full stored state of the patch. The listener function that is supplied will be called asynchronously with the state as its argument.
   * @param callback
   * @returns
   */
  requestFullStoredState: (callback: () => void) => void;
  /**
   * This will trigger an asynchronous callback to any parameter listeners that are attached, providing them with its up-to-date current value for the given endpoint. Use addAllParameterListener() to attach a listener to receive the result.
   * @param endpointID
   * @returns
   */
  requestParameterValue: (endpointID: string) => void;
  /**
   * Calling this will trigger an asynchronous callback to any status listeners with the patch’s current state. Use addStatusListener() to attach a listener to receive it.
   * @returns
   */
  requestStatusUpdate: () => void;
  /**
   * Requests a callback to any stored-state value listeners with the current value of a given key-value pair. To attach a listener to receive these events, use addStoredStateValueListener().
   * @param key
   * @returns
   */
  requestStoredStateValue: (key: string) => void;
  /**
   * Causes the patch to be reset to its “just loaded” state.
   * @returns
   */
  resetToInitialState: () => void;
  /**
   * Sends a value to one of the patch’s input endpoints. This can be used to send a value to either an ‘event’ or ‘value’ type input endpoint. If the endpoint is a ‘value’ type, then the rampFrames parameter can optionally be used to specify the number of frames over which the current value should ramp to the new target one. The value parameter will be coerced to the type that is expected by the endpoint. So for examples, numbers will be converted to float or integer types, javascript objects and arrays will be converted into more complex types in as good a fashion is possible.
   * @param endpointID
   * @param value
   * @param rampFrames
   * @returns
   */
  sendEventOrValue: <T>(endpointID: string, value: T, rampFrames?: number) => void;
  /**
   * Applies a complete stored state to the patch. To get the current complete state, use requestFullStoredState().
   * @param fullState
   * @returns
   */
  sendFullStoredState: (fullState: never) => void;
  /**
   * Sends a short MIDI message value to a MIDI endpoint. The value must be a number encoded with (byte0 << 16) | (byte1 << 8) | byte2.
   * @param endpointID
   * @param shortMIDICode
   * @returns
   */
  sendMIDIInputEvent: (endpointID: string, shortMIDICode: string) => void;
  /**
   * Tells the patch that a gesture started by sendParameterGestureStart() has finished.
   * @param endpointID
   * @returns
   */
  sendParameterGestureEnd: (endpointID: string) => void;
  /**
   * Tells the patch that a series of changes that constitute a gesture is about to take place for the given endpoint. Remember to call sendParameterGestureEnd() after they’re done!
   * @param endpointID
   * @returns
   */
  sendParameterGestureStart: (endpointID: string) => void;
  /**
   * Modifies a key-value pair in the patch’s stored state.
   * @param key
   * @param newValue
   * @returns
   */
  sendStoredStateValue: (key: string, newValue: never) => void;
} & EventListenerList;

export type EmbeddedPatchConnection = {
  listenersPerType: object;
  manifest: {
    CmajorVersion: number;
    ID: string;
    category: string;
    description: string;
    isInstrument: boolean;
    manufacturer: string;
    name: string;
    source: string;
    version: string;
    view: {
      height: number;
      resizeable: boolean;
      src: string;
      width: number;
    };
  };
  /**
   * This takes a relative path to an asset within the patch bundle, and converts it to a path relative to the root of the browser that is showing the view. You need you use this in your view code to translate your asset URLs to a form that can be safely used in your view’s HTML DOM (e.g. in its CSS). This is needed because the host’s HTTP server (which is delivering your view pages) may have a different ‘/’ root than the root of your patch (e.g. if a single server is serving multiple patch GUIs).
   * @param path
   * @returns
   */
  getResourceAddress: (path: string) => string;
  sendMessageToServer: (message: string) => void;
} & PatchConnection;
