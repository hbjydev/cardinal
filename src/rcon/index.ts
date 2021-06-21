// Copyright 2021 Hayden Young. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

import client from 'prom-client';
import Cardinal from '../core';
import { createServer as httpCreateServer, Server } from 'http';
import { URL } from 'url';

const createServer = (bot: Cardinal): Server => {
  const register = new client.Registry();

  register.setDefaultLabels({
    app: 'cardinal',
    userId: bot.client.user?.id ?? 'ERROR',
  });

  client.collectDefaultMetrics({ register });

  const server = httpCreateServer(async (req, res) => {
    const route = new URL(req.url ?? '').pathname;
    console.log(route);

    if (route == '/-/metrics') {
      res.setHeader('Content-Type', register.contentType);
      res.end(register.metrics());
    }
  });

  return server;
};

export default createServer;
