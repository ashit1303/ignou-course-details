Download entire IGNOU eGyankosh degree/course syllabus & soft copies for persuing degree

## DISCLAIMER
- This software is only built to download courses at 1 place kindly share downloaded course with every known members persuing same degree/course
- Don't abuse this software, Kindly use it responsibly, Don't span IGNOU servers

# How To Use

## update link in const START_URL = '' in index.js with your course url from browser address bar when you can see semester wise course details eg :  Semester-I | Semester-II | Semester-III | Semester-IV

Then run 
``` 
sudo apt install jq
npm install
npm run all
```

Results will be available in 
/downloadFiles/downloads -> All Pdfs semester wise
/downlaodFiles/updated_course_details.json -> Convert it to excel for youtube videos/ pdf details

## eGyanKosh hierarchy
```
Community home page
  └── Community home page (nested) [optional]
        └── Collection home page
              └── Item page
                    └── Files in This Item (PDF / HTML → YouTube)
```

## Project Folder Structure
```
egyankosh-scraper/
│
├── index.js                # entry point
├── crawler/
│   ├── crawlPage.js        # recursive dispatcher
│   ├── detectPageType.js   # page classification
│   ├── extractCommunity.js
│   ├── extractCollection.js
│   ├── extractFiles.js
│
├── utils/
│   ├── http.js
│   ├── normalizeUrl.js
│
└── output/
    └── results.json
```

## ChatGPT Prompt

let's download egyankosh resources recursively using nodejs
let me give you context 

every href starts with https://egyankosh.ac.in/

// identifier: "Files in This Item" this is root level where actual files are 
if link are pdf then use fileType as pdf , extract fileLink from href and fileName from href.
if link is html then follow /bitstream/123456789/79140/5/Audio_Book_2.html then page will be redirected to https://egyankosh.ac.in/youtubevideo.jsp?src=it4jz-7gn_Q&title=Unit-3%20Role%20Of%20Managers-Part%2001 now make youtube.com/watch?=https://www.youtube.com/watch?v=it4jz-7gn_Q as fileLink and decoded component uri title=Unit-3%20Role%20Of%20Managers-Part%2001 as videoTitle, fileName from td headers="t2" and put fileType as video.

<div class="panel panel-info"><div class="panel-heading">Files in This Item:</div>
<table class="table panel-body"><tbody><tr><th id="t1" class="standard">File</th>
<th id="t2" class="standard">Description</th>
<th id="t3" class="standard">Size</th><th id="t4" class="standard">Format</th><th>&nbsp;</th></tr>
<tr><td headers="t1" class="standard break-all"><a target="_blank" href="/bitstream/123456789/79140/3/Unit-1.pdf">Unit-1.pdf</a></td><td headers="t2" class="standard break-all">Reading Material</td><td headers="t3" class="standard">322.34 kB</td><td headers="t4" class="standard">Adobe PDF</td><td class="standard" align="center"><a target="_blank" href="/bitstream/123456789/79140/3/Unit-1.pdf"><img src="/retrieve/6d11698a-7018-47f7-b456-e6b0ce0ab6ad/Unit-1.pdf.jpg" alt="Thumbnail"></a><br><a class="btn btn-primary" target="_blank" href="/bitstream/123456789/79140/3/Unit-1.pdf">View/Open</a></td></tr><tr><td headers="t1" class="standard break-all"><a target="_blank" href="/bitstream/123456789/79140/4/Audio_Book_1.html">Audio_Book_1.html</a></td><td headers="t2" class="standard break-all">Audio Book of  Management: An Overview Part-1</td><td headers="t3" class="standard">253 B</td><td headers="t4" class="standard">HTML</td><td class="standard" align="center"><a class="btn btn-primary" target="_blank" href="/bitstream/123456789/79140/4/Audio_Book_1.html">View/Open</a></td></tr><tr><td headers="t1" class="standard break-all"><a target="_blank" href="/bitstream/123456789/79140/5/Audio_Book_2.html">Audio_Book_2.html</a></td><td headers="t2" class="standard break-all">Audio Book of  Management: An Overview Part-2</td><td headers="t3" class="standard">253 B</td><td headers="t4" class="standard">HTML</td><td class="standard" align="center"><a class="btn btn-primary" target="_blank" href="/bitstream/123456789/79140/5/Audio_Book_2.html">View/Open</a></td></tr></tbody></table>
</div>

// identifier: "Collection home page" in page and it's a level above root level
// here each href contains root node
<tbody><tr>
<th id="t1" class="oddRowEvenCol">Issue Date</th><th id="t2" class="oddRowOddCol"><strong>Title</strong></th><th id="t3" class="oddRowEvenCol">Contributor(s)</th></tr><tr><td headers="t1"><em>2021</em></td><td headers="t2"><strong><a href="/handle/123456789/79142">Unit-3 Roles of Managers</a></strong></td><td headers="t3">-</td></tr>
<tr><td headers="t1"><em>2021</em></td><td headers="t2"><strong><a href="/handle/123456789/79141">Unit-2 Management and its Evolution</a></strong></td><td headers="t3">-</td></tr>
<tr><td headers="t1"><em>2021</em></td><td headers="t2"><strong><a href="/handle/123456789/79140">Unit-1 Management: An Overview</a></strong></td><td headers="t3">-</td></tr>
<tr><td headers="t1"><em>2021</em></td><td headers="t2"><strong><a href="/handle/123456789/79137">Block-1 Introduction to Management</a></strong></td><td headers="t3"><em><a href="/browse?type=author&amp;value=Srilatha">Srilatha</a></em></td></tr>
</tbody>

// identifier: "Community home page" in page and also the base link 
// each such community home page can have multiple community home page 
<div class="list-group">
<div class="list-group-item row">
	<div class="col-md-12">
		<h4 class="list-group-item-heading"><a href="/handle/123456789/78831">
				Semester-I</a>
		</h4>
		<p class="collectionDescription"></p>
	</div>
</div>
<div class="list-group-item row">
	<div class="col-md-12">
		<h4 class="list-group-item-heading"><a href="/handle/123456789/83302">
				Semester-II</a>
		</h4>
		<p class="collectionDescription"></p>
	</div>
</div>
<div class="list-group-item row">
	<div class="col-md-12">
		<h4 class="list-group-item-heading"><a href="/handle/123456789/88064">
				Semester-III</a>
		</h4>
		<p class="collectionDescription"></p>
	</div>
</div>
<div class="list-group-item row">
	<div class="col-md-12">
		<h4 class="list-group-item-heading"><a href="/handle/123456789/92284">
				Semester-IV</a>
		</h4>
		<p class="collectionDescription"></p>
	</div>
</div>
</div>


// now the link i am giving should scrap these pages and extract the required files 

the output that i am looking is whenever end resource is found 
{
  chp1: '',
  chp2: '',
  chp3: '',
  chp4: '' // chp are Collection home page and Community home page with chp1 as parent of chp2 and so on and  values are example Semester-I OR Unit-2 Management and its Evolution
  fileType: '', //pdf OR video
  fileName: '', // name of the file example "Audio Book of  Management: An Overview Part-2"
  fileLink: '', // link of the file
  videoTitle: '', // title of the video

}