/* Trie Data Structure */
/* jshint esversion: 6 */
const fs = require('fs');
const path = require('path');

let rawdata = fs.readFileSync(path.join(__dirname, 'Dictionary.json'));
let dicttest = JSON.parse(rawdata);
//console.log(dicttest.data[0].word);


class Node {
	constructor() {
		this.keys = new Map();
		this.end = false;
		this.fa = "";
	}

	setEnd(persianword) {
		this.end = true;
		this.fa = persianword;
	}

	isEnd() {
		return this.end;
	}

	getFarsi() {
		return this.fa;
	}
}


class Trie extends Node {
	constructor() {
		super();
		this.root = new Node();
	}


	add(input, faword, node = this.root) {
		if (input.length == 0) {
			node.setEnd(faword);
			return;
		} else if (!node.keys.has(input[0])) {
			node.keys.set(input[0], new Node());
			return this.add(input.substring(1), faword, node.keys.get(input[0]));
		} else {
			return this.add(input.substring(1), faword, node.keys.get(input[0]));
		}
	}

	returnMeaning(word) {
		let node = this.root;

		while (word.length > 1) {
			if (!node.keys.has(word[0])) {
				return "Nist";
			}
			else {
				node = node.keys.get(word[0]);
				word = word.substr(1);
			}
		}
		if (node.keys.has(word) && node.keys.get(word).isEnd()) {
			return node.keys.get(word).getFarsi();
		}
		return "Nist";
	}

	print() {
		let words = [];
		let pushWords = function (node, string) {
			if (node.keys.size != 0) {

				if (node.isEnd()) {
					words.push(string);
				}
				for (let letter of node.keys.keys()) {
					pushWords(node.keys.get(letter), string.concat(letter));
				}

			} else {
				string.length > 0 ? words.push(string) : undefined;
				return;
			}
		};
		pushWords(this.root, "");
		return words.length > 0 ? words : mo;
	}
}
myTrie = new Trie();
dicttest.forEach(element => {
	//myTrie.add(element.PersianWord, element.word);
	myTrie.add(element.word, element.PersianWord);
});
function showlist() {
	let searchField = document.getElementById("search").value;

	list = myTrie.print();

	/*if (searchField != "") {
		showRecomended();
	}
	else {
		showAll();
	}*/
	if (searchField != "") {
		result = `<b style='float:right; text-align:right'>پیشنهادی ها </b><div style="padding: 10px"><ul>`;
	}
	else result = "<ul>";
	for (i = 0; i < list.length; i++) {
		flag = 0;
		if (searchField == "") result += `<li id="${list[i].split(' ').join('_')}" onclick="setToSearchInput('${list[i].split(' ').join('_')}');">${list[i]}</li>`;

		else {
			for (j = 0; j < searchField.length; j++) {
				if (list[i][j] != searchField[j]) {
					flag = 1;
				}
			}
			if (flag == 0) result += `<li id="${list[i].split(' ').join('_')}" onclick="setToSearchInput('${list[i].split(' ').join('_')}');">${list[i]}</li>`;

		}

	}

	result += "</ul></div>";
	document.getElementById("wordlist").innerHTML = result;

}
/*function showRecomended() {
	let searchField = document.getElementById("search").value;
	let result = `<b style='float:right; text-align:right'>پیشنهادی ها </b><div style="padding: 10px"><ul>`;
	let list = myTrie.print();
	for (i = 0; i < list.length; i++) {
		flag = 0;

		for (j = 0; j < searchField.length; j++) {
			if (list[i][j] != searchField[j]) {
				flag = 1;
			}
		}
		if (flag == 0) result += `<li id="${list[i].split(' ').join('_')}" onclick="setToSearchInput('${list[i].split(' ').join('_')}');">${list[i]}</li></ul></div>`;


	}
	document.getElementById("wordlist").innerHTML = result;
}
function showAll() {
	let searchField = document.getElementById("search").value;
	let result = `<ul>`;
	let list = myTrie.print();
	for (i = 0; i < list.length; i++) {
		flag = 0;

		for (j = 0; j < searchField.length; j++) {
			if (list[i][j] != searchField[j]) {
				flag = 1;
			}
		}
		if (flag == 0) result += `<li id="${list[i].split(' ').join('_')}" onclick="setToSearchInput('${list[i].split(' ').join('_')}');">${list[i]}</li></ul></div>`;


	}
	document.getElementById("wordlist").innerHTML = result;
}*/
function isRTL(s) {
	let ltrChars = 'A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02B8\u0300-\u0590\u0800-\u1FFF' + '\u2C00-\uFB1C\uFDFE-\uFE6F\uFEFD-\uFFFF',
		rtlChars = '\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC',
		rtlDirCheck = new RegExp('^[^' + ltrChars + ']*[' + rtlChars + ']');

	return rtlDirCheck.test(s);
}

function setToSearchInput(li_value) {
	document.getElementById("search").value = document.getElementById(li_value).innerHTML;
}
function search() {
	word = document.getElementById("search").value;

	//let start = new Date();

	if (word == "") {

		document.getElementById("engword").innerHTML = `ورودی نامناسب`;
		document.getElementById("engword").style = `color:red`;
		document.getElementById("perword").innerHTML = ``;
	}
	else {

		res = myTrie.returnMeaning(word);
		if (res == "Nist") {
			document.getElementById("engword").innerHTML = `ورودی نامناسب`;
			document.getElementById("engword").style = `color:red`;
			document.getElementById("perword").innerHTML = ``;
		}

		else {
			document.getElementById("engword").innerHTML = `English: ${word}`;
			document.getElementById("engword").style = `color:blue`;
			document.getElementById("perword").innerHTML = `پارسی: ${res}`;

		}
	}
	//let finish = new Date();
	//console.log(`zaman ejra ${(finish.getTime() - start.getTime())} ms`);
	document.getElementById('search').value = '';
	//showlist();

}



console.log(myTrie.root);
console.log(myTrie.print());

