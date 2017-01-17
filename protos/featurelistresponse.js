/**
 * @fileoverview
 * @enhanceable
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

goog.provide('proto.sqwak.FeatureListResponse');

goog.require('jspb.Message');


/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.sqwak.FeatureListResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.sqwak.FeatureListResponse.repeatedFields_, null);
};
goog.inherits(proto.sqwak.FeatureListResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.sqwak.FeatureListResponse.displayName = 'proto.sqwak.FeatureListResponse';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.sqwak.FeatureListResponse.repeatedFields_ = [4];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.sqwak.FeatureListResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.sqwak.FeatureListResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.sqwak.FeatureListResponse} msg The msg instance to transform.
 * @return {!Object}
 */
proto.sqwak.FeatureListResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    message: jspb.Message.getFieldWithDefault(msg, 1, ""),
    featureVectorList: jspb.Message.getField(msg, 4)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * optional string message = 1;
 * @return {string}
 */
proto.sqwak.FeatureListResponse.prototype.getMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/** @param {string} value */
proto.sqwak.FeatureListResponse.prototype.setMessage = function(value) {
  jspb.Message.setField(this, 1, value);
};


/**
 * repeated string feature_vector = 4;
 * If you change this array by adding, removing or replacing elements, or if you
 * replace the array itself, then you must call the setter to update it.
 * @return {!Array.<string>}
 */
proto.sqwak.FeatureListResponse.prototype.getFeatureVectorList = function() {
  return /** @type {!Array.<string>} */ (jspb.Message.getField(this, 4));
};


/** @param {!Array.<string>} value */
proto.sqwak.FeatureListResponse.prototype.setFeatureVectorList = function(value) {
  jspb.Message.setField(this, 4, value || []);
};


/**
 * @param {!string} value
 * @param {number=} opt_index
 */
proto.sqwak.FeatureListResponse.prototype.addFeatureVector = function(value, opt_index) {
  jspb.Message.addToRepeatedField(this, 4, value, opt_index);
};


proto.sqwak.FeatureListResponse.prototype.clearFeatureVectorList = function() {
  this.setFeatureVectorList([]);
};


