export const permissionMock = {
  addEventListener(event: string, listener: () => Promise<void>): void {
    this.listener = listener;
  },

  async listener(): Promise<void> {
    return;
  },

  removeEventListener: jest.fn(),

  state: 'granted',

  async triggerChange(state: PermissionState): Promise<void> {
    this.state = state;
    await this.listener();
  },
};
