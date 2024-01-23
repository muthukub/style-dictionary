export default `xml version="1.0" encoding="UTF-8"?>
<%
//
// Copyright 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License").
// You may not use this file except in compliance with the License.
// A copy of the License is located at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// or in the "license" file accompanying this file. This file is distributed
// on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
// express or implied. See the License for the specific language governing
// permissions and limitations under the License.

const tokens = dictionary.allTokens.filter(function(token) {
  return token.attributes.category === 'size' && token.attributes.type !== 'font'
}); %>
<%= fileHeader({file, commentStyle: 'xml'}) %>
<resources>
  <% tokens.forEach(function(token) {
  %><dimen name="<%= token.name %>"><%= token.$value ?? token.value %></dimen><% if (token.comment) { %><!-- <%= token.comment %> --><% } %>
  <% }); %>
</resources>`;