var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Post Model
 * ==========
 */

var Post = new keystone.List('Post', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true }
});

Post.add({
	title: { type: String, required: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	// author should be the admin by default
	author: { type: Types.Relationship, ref: 'User', index: true, noedit: true },
	// both of these should be automatically done using mongoose pre methods
	creationDate: { type: Types.Date, index: true, noedit: true},
	lastEditDate: { type: Types.Date, index: true, noedit: true},
	// publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
	// image: { type: Types.CloudinaryImage },
	content: {
		brief: { type: Types.Html, wysiwyg: true, height: 150 },
		extended: { type: Types.Html, wysiwyg: true, height: 400 }
	},
	categories: { type: Types.Relationship, ref: 'PostCategory', many: true },
	tags: { type: Types.Relationship, ref: 'PostTag', many: true },
	favoritors: {type: Types.Relationship, ref: 'User', many: true, noedit: true},
	forks: {type: Types.Relationship, ref: 'Post', many: true, noedit: true}
});

Post.schema.virtual('content.full').get(function() {
	return this.content.extended || this.content.brief;
});

Post.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Post.register();
