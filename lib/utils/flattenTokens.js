/*
 * Copyright 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with
 * the License. A copy of the License is located at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions
 * and limitations under the License.
 */

import isPlainObject from 'is-plain-obj';

/**
 * @typedef {import('../../types/DesignToken.d.ts').TransformedTokens} Tokens
 * @typedef {import('../../types/DesignToken.d.ts').TransformedToken} Token
 */

/**
 * Takes an plain javascript object and will make a flat array of all the leaf nodes.
 * A leaf node in this context has a 'value' property. Potentially refactor this to
 * be more generic.
 * @private
 * @param  {Tokens} tokens - The plain object you want flattened into an array.
 * @param  {Token[]} [to_ret] - Tokens array. This function is recursive therefore this is what gets passed along.
 * @return {Token[]}
 */
export default function flattenTokens(tokens, to_ret = []) {
  for (let name in tokens) {
    if (Object.hasOwn(tokens, name)) {
      // TODO: this is a bit fragile and arbitrary to stop when we get to a 'value' property.
      if (
        isPlainObject(tokens[name]) &&
        (Object.hasOwn(tokens[name], '$value') || Object.hasOwn(tokens[name], 'value'))
      ) {
        to_ret.push(/** @type {Token} */ (tokens[name]));
      } else if (isPlainObject(tokens[name])) {
        flattenTokens(tokens[name], to_ret);
      }
    }
  }
  return to_ret;
}