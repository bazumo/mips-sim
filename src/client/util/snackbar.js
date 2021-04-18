import { message } from "antd";

const msgtypes = ['open', 'success', 'error', 'info', 'warning', 'warn', 'loading'];

const snackbar = Object.fromEntries(msgtypes.map(s => [
  s,
  (content) => {
    const r = message[s]({
      content,
      onClick: () => r(),
    });
  }
]));

export default snackbar;
