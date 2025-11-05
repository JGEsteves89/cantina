/* eslint-disable sonarjs/os-command */
const { execSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const pkgPath = path.resolve(__dirname, 'package.json');

function run(command) {
  console.log(`> ${command}`);
  execSync(command, { stdio: 'inherit', shell: true });
}

const pkg = require(pkgPath);
const appName = pkg.name;

function getVersion() {
  const pkgJson = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
  return pkgJson.version;
}

const scripts = {
  dockerBuild: () => {
    run(`docker build -t ijimiguel/${appName}:${getVersion()} .`);
  },

  dockerPush: () => {
    run(
      `docker tag ijimiguel/${appName}:${getVersion()} ijimiguel/${appName}:latest && docker push ijimiguel/${appName}:${getVersion()} && docker push ijimiguel/${appName}:latest`,
    );
  },

  dockerRelease: () => {
    run(`npm run build`),
    scripts.dockerBuild();
    scripts.dockerPush();
  },

  dockerPull: () =>
    run(
      `docker rmi ijimiguel/${appName}:latest && docker pull ijimiguel/${appName}:latest`,
    ),

  dockerStop: () => run('docker-compose down'),

  dockerCompose: () => run('UID=$(id -u) GID=$(id -g) docker-compose up -d'),

  dockerRestart: () => {
    scripts.dockerPull();
    scripts.dockerStop();
    scripts.dockerCompose();
  },

  releasePatch: () => {
    run('npm version patch');
    scripts.dockerRelease();
    run('git push --follow-tags');
  },

  releaseMinor: () => {
    run('npm version minor');
    scripts.dockerRelease();
    run('git push --follow-tags');
  },

  releaseMajor: () => {
    run('npm version major');
    scripts.dockerRelease();
    run('git push --follow-tags');
  },
};

const [, , scriptName] = process.argv;

if (!scriptName || !scripts[scriptName]) {
  console.error(`Unknown script: ${scriptName}`);
  console.log('Available scripts:', Object.keys(scripts).join(', '));
  process.exit(1);
}

scripts[scriptName]();
