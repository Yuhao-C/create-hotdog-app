#!/usr/bin/env node

'use strict';

const fs = require('fs-extra');
const path = require('path');

const src = path.resolve(__dirname, '../template');
const dest = path.resolve(__dirname, '../lib/template');
fs.copySync(src, dest);
