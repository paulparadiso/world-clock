var CLOCK_DEFINITIONS = {
	"clock-1" : {
		"location" : "San Francisco",
		"time-zone" : "America/Los_Angeles"
	},
	"clock-2" : {
		"location" : "Bogota",
		"time-zone" : "America/Bogota"
	},
	"clock-3" : {
		"location" : "New York",
		"time-zone" : "America/New_York"
	},
	"clock-4" : {
		"location" : "Santiago",
		"time-zone" : "America/Santiago"
	},
	"clock-5" : {
		"location" : "Houston",
		"time-zone" : "America/Denver"
	},
	"clock-6" : {
		"location" : "Lima",
		"time-zone" : "America/Lima"
	},
	"clock-7" : {
		"location" : "Panama City",
		"time-zone" : "America/New_York"
	},
	"clock-8" : {
		"location" : "Rio",
		"time-zone" : "America/Sao_Paulo"
	},
	"clock-9" : {
		"location" : "Mexico City",
		"time-zone" : "America/Mexico_City"
	},
	"clock-10" : {
		"location" : "Columbus",
		"time-zone" : "America/New_York"
	},
	"clock-11" : {
		"location" : "Buenos Aires",
		"time-zone" : "America/Argentina/Buenos_Aires"
	},
	"clock-12" : {
		"location" : "London",
		"time-zone" : "Europe/London"
	},
	"clock-13" : {
		"location" : "Frankfurt",
		"time-zone" : "Europe/Berlin"
	},
	"clock-14" : {
		"location" : "Oslo",
		"time-zone" : "Europe/Oslo"
	},
	"clock-15" : {
		"location" : "Cairo",
		"time-zone" : "Africa/Cairo"
	},
	"clock-16" : {
		"location" : "Moscow",
		"time-zone" : "Europe/Moscow"
	},
	"clock-17" : {
		"location" : "Madrid",
		"time-zone" : "Europe/Madrid"
	},
	"clock-18" : {
		"location" : "Paris",
		"time-zone" : "Europe/Paris"
	},
	"clock-19" : {
		"location" : "Johannesburg",
		"time-zone" : "Africa/Johannesburg"
	},
	"clock-20" : {
		"location" : "Riyadh",
		"time-zone" : "Asia/Riyadh"
	},
	"clock-21" : {
		"location" : "Milan",
		"time-zone" : "Europe/Berlin"
	},
	"clock-22" : {
		"location" : "Zurich",
		"time-zone" : "Europe/Zurich"
	},
	"clock-23" : {
		"location" : "Istanbul",
		"time-zone" : "Europe/Istanbul"
	},
	"clock-24" : {
		"location" : "Dubai",
		"time-zone" : "Asia/Dubai"
	},
	"clock-25" : {
		"location" : "Bengaluru",
		"time-zone" : "Asia/Kolkata"
	},
	"clock-26" : {
		"location" : "Jakarta",
		"time-zone" : "Asia/Jakarta"
	},
	"clock-27" : {
		"location" : "Shanghai",
		"time-zone" : "Asia/Shanghai"
	},
	"clock-28" : {
		"location" : "Tokyo",
		"time-zone" : "Asia/Tokyo"
	},
	"clock-29" : {
		"location" : "Mumbai",
		"time-zone" : "Asia/Kolkata"
	},
	"clock-30" : {
		"location" : "Kuala Lumpur",
		"time-zone" : "Asia/Kuala_Lumpur"
	},
	"clock-31" : {
		"location" : "Singapore",
		"time-zone" : "Asia/Singapore"
	},
	"clock-32" : {
		"location" : "Sydney",
		"time-zone" : "Australia/Sydney"
	},
	"clock-33" : {
		"location" : "Bangkok",
		"time-zone" : "Asia/Bangkok"
	},
	"clock-34" : {
		"location" : "Cebu",
		"time-zone" : "Asia/Manila"
	},
	"clock-35" : {
		"location" : "Seoul",
		"time-zone" : "Asia/Seoul"
	},
	"clock-36" : {
		"location" : "Wellington",
		"time-zone" : "Pacific/Auckland"
	}
}

// Digits consist of six clocks
// The 'setup' record for a given digit specifies placement 
// of the hour, minute, and second placement for each of six clocks in a three-character format.
// Examples:
//  ses --- hour hand points down/south, minute hand points left/east, second hand points down/south
//  nwn -- hour hand points up/north, minute hand points left/west, second hand points up/north
//  ana -- hour hand points northeast, minute hand points north, second hand points northeast
//
//  4-character codes (with an i on the end) mean the component is invisible for that digit
var DIGIT_SETUP = {
    "0" : ["ses", "sws", "sns", "sns", "nen", "nwn"],
    "1" : ["ses", "sws", "anai", "sns", "eee", "enw"],
    "2" : ["eee", "wss", "ses", "nwn", "nen", "www"],
    "3" : ["eee", "sws", "eee", "nwn", "eee", "nwn"],
    "4" : ["sss", "sss", "nen", "snw", "wwwi", "nnn"],
    "5" : ["ses", "www", "nen", "sws", "eee", "nwn"],
    "6" : ["ses", "www", "sen", "sws", "nen", "nwn"],
    "7" : ["ses", "sws", "nnn", "sns", "eeei", "nnn"],
    "8" : ["ses", "sws", "sen", "swn", "nen", "nwn"],
    "9" : ["ses", "sws", "ene", "snw", "eee", "nwn"]
}
