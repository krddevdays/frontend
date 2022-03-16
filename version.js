#!/usr/bin/env node

'use strict';

let branch;

switch(process.env.DRONE_BUILD_EVENT) {
    case 'pull_request':
        branch = `pr-${process.env.DRONE_PULL_REQUEST}`;
        break;
    case 'push':
        branch = process.env.DRONE_BRANCH;
        break;
    default:
        console.log(`Unknown build event ${process.env.DRONE_BUILD_EVENT}`);
        process.exit(1);
}

branch = branch.replace(/[\/.]/g, '-')

const commitHash = process.env.DRONE_COMMIT_SHA.slice(0, 8);

const datetime = new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-')

console.log(`${branch}.${datetime}.${commitHash}`)
