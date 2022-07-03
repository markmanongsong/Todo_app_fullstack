import mongoose from 'mongoose';
import _debug from 'debug';

const debug = _debug('server');

const { connect } = mongoose;

export default async (host, dbName) => {
  try {
    debug('Mongo DB connection established', host, dbName);

    await connect(host, {
      dbName,
    });
  } catch (e) {
    debug('Something went wrong', e);
  }
};
