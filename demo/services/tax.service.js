"use strict";
/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */
module.exports = {
	name: "tax",
	settings: {},
	dependencies: [],
	actions: {
		welcome: {
			rest: "/calculate",
			async handler(ctx) {
				return ctx.params.amount * 0.2;
			},
		},
	},
	events: {},
	methods: {},
	created() {},
	async started() {},
	async stopped() {},
};
