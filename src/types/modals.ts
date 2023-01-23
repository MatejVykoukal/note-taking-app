export enum ModalTypes {
  CREATE_NOTE = "CREATE_NOTE",
  EDIT_NOTE = "EDIT_NOTE",
  DELETE_NOTE = "DELETE_NOTE",
}

export interface CreateModalStore {
  modalType: ModalTypes.CREATE_NOTE;
}
export interface DeleteModalStore {
  modalType: ModalTypes.DELETE_NOTE;
  payload: {
    deleteNoteId: string;
  };
}
export interface EditModalStore {
  modalType: ModalTypes.EDIT_NOTE;
}

export type ModalStoreTypes =
  | CreateModalStore
  | DeleteModalStore
  | EditModalStore;
