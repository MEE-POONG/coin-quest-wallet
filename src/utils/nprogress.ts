import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// Configure NProgress
NProgress.configure({
  showSpinner: false,
  minimum: 0.1,
  easing: 'ease',
  speed: 500,
});

export const startProgress = () => {
  NProgress.start();
};

export const doneProgress = () => {
  NProgress.done();
};

export const setProgress = (progress: number) => {
  NProgress.set(progress);
};

export const incProgress = (amount?: number) => {
  NProgress.inc(amount);
}; 