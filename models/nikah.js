'use strict';

/**
 * Module dependencies.
 */

const mongoose = require('mongoose');

/**
 * Nikah Schema
 */

const NikahSchema = mongoose.Schema({
  agama: { type: String, default: '' },
  calon: { type: String, default: '' },
  first_name: { type: String, default: '' },
  jenis_kelamin: { type: String, default: '' },
  last_name: { type: String, default: '' },
  pekerjaan: { type: String, default: '' },
  status_kawin: { type: String, default: '' },
  ttl: { type : Date, default: '' },
  warga_negara: { type: String, default: '' },
});

/**
 * Validations
 */

// the below 5 validations only apply if you are signing up traditionally

NikahSchema.path('agama').validate(function (name) {
  return name.length;
}, 'Agama cannot be blank');

NikahSchema.path('calon').validate(function (email) {
  return email.length;
}, 'Nama calon cannot be blank');

NikahSchema.path('first_name').validate(function (username) {
  return username.length;
}, 'Nama Pertama cannot be blank');

NikahSchema.path('jenis_kelamin').validate(function (username) {
  return username.length;
}, 'Jenis Kelamin cannot be blank');

NikahSchema.path('last_name').validate(function (username) {
  return username.length;
}, 'Nama Akhir cannot be blank');

NikahSchema.path('pekerjaan').validate(function (username) {
  return username.length;
}, 'Pekerjaan cannot be blank');

NikahSchema.path('status_kawin').validate(function (username) {
  return username.length;
}, 'Status Kawin cannot be blank');

NikahSchema.path('ttl').validate(function (username) {
  return username.length;
}, 'Tempat Tanggal Lahir cannot be blank');

NikahSchema.path('warga_negara').validate(function (username) {
  return username.length;
}, 'Warga Negara cannot be blank');

module.exports = mongoose.model('Nikah', NikahSchema);