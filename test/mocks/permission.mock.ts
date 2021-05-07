export const permissionMock = {
  addEventListener(event: string, listener: () => Promise<void>): void {
    this.listener = listener;
  },

  async listener(): Promise<void> {
    return;
  },

  state: 'granted',

  async triggerChange(state: PermissionState): Promise<void> {
    this.state = state;
    await this.listener();
  },
};
