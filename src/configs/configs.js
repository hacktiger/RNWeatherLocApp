import environment from './environment/index.js';

/**
 * @param {*} type is one of ['google','hotlab','weather']
 * @param {*} env is one of ['QA','STG','PRD']
 */
const ENV = 'QA';

// default ENV is QA;
const createCloudConfigs = (type, env = ENV) => {
  if (!environment[type] || !environment[type][env]) {
    return
  }

  return environment[type][env] ;
};

const createLocalConfigs = () => null;

export default createCloudConfigs
