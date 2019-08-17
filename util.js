const undecodeHtml = (str) => {
	str = str.replace(/&((g|l|quo)t|amp|#39|nbsp|);/g, function (m) {
		return {
			'&lt;': '<',
			'&amp;': '&',
			'&quot;': '"',
			'&gt;': '>',
			'&#39;': "'",
			'&nbsp;': ' '
		}[m]
	})
	str = str.replace(/&((g|l|quo)t|amp|#39|nbsp|);/g, function (m) {
		return {
			'&lt;': '<',
			'&amp;': '&',
			'&quot;': '"',
			'&gt;': '>',
			'&#39;': "'",
			'&nbsp;': ' '
		}[m]
	})
	return str
}

const util = {
	undecodeHtml
}

module.exports = util