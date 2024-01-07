import { EmbeddedPatchConnection } from '../types';

export const mockPatchConnection: EmbeddedPatchConnection = {
  addEventListener: () => null,
  addSingleUseListener: () => null,
  dispatchEvent: () => null,
  getNumListenersForType: () => 0,
  removeEventListener: () => null,
  listenersPerType: {},
  manifest: {
    CmajorVersion: 0,
    ID: '',
    category: '',
    description: '',
    isInstrument: false,
    manufacturer: '',
    name: '',
    source: '',
    version: '',
    view: {
      height: 0,
      resizeable: false,
      src: '',
      width: 0,
    },
  },
  getResourceAddress: (path: string) => '',
  sendMessageToServer: (message: string) => {},
  addAllParameterListener: (listener: (parameter: { endpointID: string; value: unknown }) => void) => {},
  addEndpointListener: (
    endpointId: string,
    listener: EventListener,
    granularity?: number,
    sendFullAudioData?: boolean
  ) => {},
  addParameterListener: <T>(endpointID: string, listener: (value: T) => void) => {},
  addStatusListener: (
    listener: (status: {
      details: {
        inputs: Array<any>;
      };
    }) => void
  ) => {},
  addStoredStateValueListener: (listener: EventListener) => {},
  deliverMessageFromServer: (msg: string) => {},
  removeAllParameterListener: (listener: EventListener) => {},
  removeEndpointListener: (endpointID: string, listener: EventListener) => {},
  removeParameterListener: <T>(endpointID: string, listener: T) => {},
  removeStatusListener: <T>(listener: (value: T) => void) => {},
  removeStoredStateValueListener: (listener: EventListener) => {},
  requestFullStoredState: (callback: () => void) => {},
  requestParameterValue: (endpointID: string) => {},
  requestStatusUpdate: () => {},
  requestStoredStateValue: (key: string) => {},
  resetToInitialState: () => {},
  sendEventOrValue: <T>(endpointID: string, value: T, rampFrames?: number) => {},
  sendFullStoredState: (fullState: never) => {},
  sendMIDIInputEvent: (endpointID: string, shortMIDICode: string) => {},
  sendParameterGestureEnd: (endpointID: string) => {},
  sendParameterGestureStart: (endpointID: string) => {},
  sendStoredStateValue: (key: string, newValue: never) => {},
};
