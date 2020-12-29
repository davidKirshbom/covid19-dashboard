const mongoose=require('mongoose')
const statusSchema = new mongoose.Schema(
	{
		name: {
			type: String,
            trim: true,
            required:true,
			validate(value) {
                const validStatuses = ['נבדק', 'לא חולה', 'חולה', 'החלים', 'נפטר']
                if (!validStatuses.includes(value))
                    throw new Error('invalid status name')
			},
		},
		detail: {
			type: String,
			validate(value) {
                const validStatuses = ['קריטי', 'קשה', 'בינוני', 'קל', 'ללא תסמינים']
                if (!validStatuses.includes(value))
                    throw new Error('invalid status')
			},
		},
		isRespiratory: {
			type: Boolean,
			required: true,
		},
		end_date: {
			type: Date,
		},
	},
	{
		timestamps: true,
	}
);

module.exports=statusSchema