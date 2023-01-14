
function init() {}

function log(error) {
  console.error(error);
  // Raven.captureException(error);
}

export default {
  init,
  log,
};
