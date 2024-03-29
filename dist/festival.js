(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Festival = factory());
})(this, (function () { 'use strict';

  var holiday = {
  	"20070101": "元旦",
  	"20070102": "元旦",
  	"20070103": "元旦",
  	"20070218": "春节",
  	"20070219": "春节",
  	"20070220": "春节",
  	"20070221": "春节",
  	"20070222": "春节",
  	"20070223": "春节",
  	"20070224": "春节",
  	"20070501": "劳动节",
  	"20070502": "劳动节",
  	"20070503": "劳动节",
  	"20070504": "劳动节",
  	"20070505": "劳动节",
  	"20070506": "劳动节",
  	"20070507": "劳动节",
  	"20071001": "国庆节",
  	"20071002": "国庆节",
  	"20071003": "国庆节",
  	"20071004": "国庆节",
  	"20071005": "国庆节",
  	"20071006": "国庆节",
  	"20071007": "国庆节",
  	"20071230": "元旦",
  	"20071231": "元旦",
  	"20080101": "元旦",
  	"20080206": "春节",
  	"20080207": "春节",
  	"20080208": "春节",
  	"20080209": "春节",
  	"20080210": "春节",
  	"20080211": "春节",
  	"20080212": "春节",
  	"20080404": "清明节",
  	"20080405": "清明节",
  	"20080406": "清明节",
  	"20080501": "劳动节",
  	"20080502": "劳动节",
  	"20080503": "劳动节",
  	"20080607": "端午节",
  	"20080608": "端午节",
  	"20080609": "端午节",
  	"20080913": "中秋节",
  	"20080914": "中秋节",
  	"20080915": "中秋节",
  	"20080929": "国庆节",
  	"20080930": "国庆节",
  	"20081001": "国庆节",
  	"20081002": "国庆节",
  	"20081003": "国庆节",
  	"20081004": "国庆节",
  	"20081005": "国庆节",
  	"20090101": "元旦",
  	"20090102": "元旦",
  	"20090103": "元旦",
  	"20090125": "春节",
  	"20090126": "春节",
  	"20090127": "春节",
  	"20090128": "春节",
  	"20090129": "春节",
  	"20090130": "春节",
  	"20090131": "春节",
  	"20090404": "清明节",
  	"20090405": "清明节",
  	"20090406": "清明节",
  	"20090501": "劳动节",
  	"20090502": "劳动节",
  	"20090503": "劳动节",
  	"20090528": "端午节",
  	"20090529": "端午节",
  	"20090530": "端午节",
  	"20091001": "国庆节",
  	"20091002": "国庆节",
  	"20091003": "国庆节",
  	"20091004": "国庆节",
  	"20091005": "国庆节",
  	"20091006": "国庆节",
  	"20091007": "国庆节",
  	"20091008": "国庆节",
  	"20100101": "元旦",
  	"20100102": "元旦",
  	"20100103": "元旦",
  	"20100213": "春节",
  	"20100214": "春节",
  	"20100215": "春节",
  	"20100216": "春节",
  	"20100217": "春节",
  	"20100218": "春节",
  	"20100219": "春节",
  	"20100403": "清明节",
  	"20100404": "清明节",
  	"20100405": "清明节",
  	"20100501": "劳动节",
  	"20100502": "劳动节",
  	"20100503": "劳动节",
  	"20100614": "端午节",
  	"20100615": "端午节",
  	"20100616": "端午节",
  	"20100922": "中秋节",
  	"20100923": "中秋节",
  	"20100924": "中秋节",
  	"20101001": "国庆节",
  	"20101002": "国庆节",
  	"20101003": "国庆节",
  	"20101004": "国庆节",
  	"20101005": "国庆节",
  	"20101006": "国庆节",
  	"20101007": "国庆节",
  	"20110101": "元旦",
  	"20110102": "元旦",
  	"20110103": "元旦",
  	"20110202": "春节",
  	"20110203": "春节",
  	"20110204": "春节",
  	"20110205": "春节",
  	"20110206": "春节",
  	"20110207": "春节",
  	"20110208": "春节",
  	"20110403": "清明节",
  	"20110404": "清明节",
  	"20110405": "清明节",
  	"20110430": "劳动节",
  	"20110501": "劳动节",
  	"20110502": "劳动节",
  	"20110604": "端午节",
  	"20110605": "端午节",
  	"20110606": "端午节",
  	"20110910": "中秋节",
  	"20110911": "中秋节",
  	"20110912": "中秋节",
  	"20111001": "国庆节",
  	"20111002": "国庆节",
  	"20111003": "国庆节",
  	"20111004": "国庆节",
  	"20111005": "国庆节",
  	"20111006": "国庆节",
  	"20111007": "国庆节",
  	"20120101": "元旦",
  	"20120102": "元旦",
  	"20120103": "元旦",
  	"20120122": "春节",
  	"20120123": "春节",
  	"20120124": "春节",
  	"20120125": "春节",
  	"20120126": "春节",
  	"20120127": "春节",
  	"20120128": "春节",
  	"20120402": "清明节",
  	"20120403": "清明节",
  	"20120404": "清明节",
  	"20120429": "劳动节",
  	"20120430": "劳动节",
  	"20120501": "劳动节",
  	"20120622": "端午节",
  	"20120623": "端午节",
  	"20120624": "端午节",
  	"20120930": "国庆节",
  	"20121001": "国庆节",
  	"20121002": "国庆节",
  	"20121003": "国庆节",
  	"20121004": "国庆节",
  	"20121005": "国庆节",
  	"20121006": "国庆节",
  	"20121007": "国庆节",
  	"20130101": "元旦",
  	"20130102": "元旦",
  	"20130103": "元旦",
  	"20130209": "春节",
  	"20130210": "春节",
  	"20130211": "春节",
  	"20130212": "春节",
  	"20130213": "春节",
  	"20130214": "春节",
  	"20130215": "春节",
  	"20130404": "清明节",
  	"20130405": "清明节",
  	"20130406": "清明节",
  	"20130429": "劳动节",
  	"20130430": "劳动节",
  	"20130501": "劳动节",
  	"20130610": "端午节",
  	"20130611": "端午节",
  	"20130612": "端午节",
  	"20130919": "中秋节",
  	"20130920": "中秋节",
  	"20130921": "中秋节",
  	"20131001": "国庆节",
  	"20131002": "国庆节",
  	"20131003": "国庆节",
  	"20131004": "国庆节",
  	"20131005": "国庆节",
  	"20131006": "国庆节",
  	"20131007": "国庆节",
  	"20140101": "元旦",
  	"20140131": "春节",
  	"20140201": "春节",
  	"20140202": "春节",
  	"20140203": "春节",
  	"20140204": "春节",
  	"20140205": "春节",
  	"20140206": "春节",
  	"20140405": "清明节",
  	"20140406": "清明节",
  	"20140407": "清明节",
  	"20140501": "劳动节",
  	"20140502": "劳动节",
  	"20140503": "劳动节",
  	"20140531": "端午节",
  	"20140601": "端午节",
  	"20140602": "端午节",
  	"20140906": "中秋节",
  	"20140907": "中秋节",
  	"20140908": "中秋节",
  	"20141001": "国庆节",
  	"20141002": "国庆节",
  	"20141003": "国庆节",
  	"20141004": "国庆节",
  	"20141005": "国庆节",
  	"20141006": "国庆节",
  	"20141007": "国庆节",
  	"20150101": "元旦",
  	"20150102": "元旦",
  	"20150103": "元旦",
  	"20150218": "春节",
  	"20150219": "春节",
  	"20150220": "春节",
  	"20150221": "春节",
  	"20150222": "春节",
  	"20150223": "春节",
  	"20150224": "春节",
  	"20150404": "清明节",
  	"20150405": "清明节",
  	"20150406": "清明节",
  	"20150501": "劳动节",
  	"20150502": "劳动节",
  	"20150503": "劳动节",
  	"20150620": "端午节",
  	"20150621": "端午节",
  	"20150622": "端午节",
  	"20150903": "非节假日",
  	"20150904": "非节假日",
  	"20150905": "非节假日",
  	"20150926": "中秋节",
  	"20150927": "中秋节",
  	"20151001": "国庆节",
  	"20151002": "国庆节",
  	"20151003": "国庆节",
  	"20151004": "国庆节",
  	"20151005": "国庆节",
  	"20151006": "国庆节",
  	"20151007": "国庆节",
  	"20160101": "元旦",
  	"20160102": "元旦",
  	"20160103": "元旦",
  	"20160207": "春节",
  	"20160208": "春节",
  	"20160209": "春节",
  	"20160210": "春节",
  	"20160211": "春节",
  	"20160212": "春节",
  	"20160213": "春节",
  	"20160402": "清明节",
  	"20160403": "清明节",
  	"20160404": "清明节",
  	"20160430": "劳动节",
  	"20160501": "劳动节",
  	"20160502": "劳动节",
  	"20160609": "端午节",
  	"20160610": "端午节",
  	"20160611": "端午节",
  	"20160915": "中秋节",
  	"20160916": "中秋节",
  	"20160917": "中秋节",
  	"20161001": "国庆节",
  	"20161002": "国庆节",
  	"20161003": "国庆节",
  	"20161004": "国庆节",
  	"20161005": "国庆节",
  	"20161006": "国庆节",
  	"20161007": "国庆节",
  	"20161231": "元旦",
  	"20170101": "元旦",
  	"20170102": "元旦",
  	"20170127": "春节",
  	"20170128": "春节",
  	"20170129": "春节",
  	"20170130": "春节",
  	"20170131": "春节",
  	"20170201": "春节",
  	"20170202": "春节",
  	"20170402": "清明节",
  	"20170403": "清明节",
  	"20170404": "清明节",
  	"20170429": "劳动节",
  	"20170430": "劳动节",
  	"20170501": "劳动节",
  	"20170528": "端午节",
  	"20170529": "端午节",
  	"20170530": "端午节",
  	"20171001": "国庆节",
  	"20171002": "国庆节",
  	"20171003": "国庆节",
  	"20171004": "国庆节",
  	"20171005": "国庆节",
  	"20171006": "国庆节",
  	"20171007": "国庆节",
  	"20171008": "国庆节",
  	"20171230": "元旦",
  	"20171231": "元旦",
  	"20180101": "元旦",
  	"20180215": "春节",
  	"20180216": "春节",
  	"20180217": "春节",
  	"20180218": "春节",
  	"20180219": "春节",
  	"20180220": "春节",
  	"20180221": "春节",
  	"20180405": "清明节",
  	"20180406": "清明节",
  	"20180407": "清明节",
  	"20180429": "劳动节",
  	"20180430": "劳动节",
  	"20180501": "劳动节",
  	"20180616": "端午节",
  	"20180617": "端午节",
  	"20180618": "端午节",
  	"20180922": "中秋节",
  	"20180923": "中秋节",
  	"20180924": "中秋节",
  	"20181001": "国庆节",
  	"20181002": "国庆节",
  	"20181003": "国庆节",
  	"20181004": "国庆节",
  	"20181005": "国庆节",
  	"20181006": "国庆节",
  	"20181007": "国庆节",
  	"20181230": "元旦",
  	"20181231": "元旦",
  	"20190101": "元旦",
  	"20190204": "春节",
  	"20190205": "春节",
  	"20190206": "春节",
  	"20190207": "春节",
  	"20190208": "春节",
  	"20190209": "春节",
  	"20190210": "春节",
  	"20190405": "清明节",
  	"20190406": "清明节",
  	"20190407": "清明节",
  	"20190501": "劳动节",
  	"20190502": "劳动节",
  	"20190503": "劳动节",
  	"20190504": "劳动节",
  	"20190607": "端午节",
  	"20190608": "端午节",
  	"20190609": "端午节",
  	"20190913": "中秋节",
  	"20190914": "中秋节",
  	"20190915": "中秋节",
  	"20191001": "国庆节",
  	"20191002": "国庆节",
  	"20191003": "国庆节",
  	"20191004": "国庆节",
  	"20191005": "国庆节",
  	"20191006": "国庆节",
  	"20191007": "国庆节",
  	"20200101": "元旦",
  	"20200124": "春节",
  	"20200125": "春节",
  	"20200126": "春节",
  	"20200127": "春节",
  	"20200128": "春节",
  	"20200129": "春节",
  	"20200130": "春节",
  	"20200131": "春节",
  	"20200201": "春节",
  	"20200202": "春节",
  	"20200404": "清明节",
  	"20200405": "清明节",
  	"20200406": "清明节",
  	"20200501": "劳动节",
  	"20200502": "劳动节",
  	"20200503": "劳动节",
  	"20200504": "劳动节",
  	"20200505": "劳动节",
  	"20200625": "端午节",
  	"20200626": "端午节",
  	"20200627": "端午节",
  	"20201001": "国庆节",
  	"20201002": "国庆节",
  	"20201003": "国庆节",
  	"20201004": "国庆节",
  	"20201005": "国庆节",
  	"20201006": "国庆节",
  	"20201007": "国庆节",
  	"20201008": "国庆节",
  	"20210101": "元旦",
  	"20210102": "元旦",
  	"20210103": "元旦",
  	"20210211": "春节",
  	"20210212": "春节",
  	"20210213": "春节",
  	"20210214": "春节",
  	"20210215": "春节",
  	"20210216": "春节",
  	"20210217": "春节",
  	"20210403": "清明节",
  	"20210404": "清明节",
  	"20210405": "清明节",
  	"20210501": "劳动节",
  	"20210502": "劳动节",
  	"20210503": "劳动节",
  	"20210504": "劳动节",
  	"20210505": "劳动节",
  	"20210612": "端午节",
  	"20210613": "端午节",
  	"20210614": "端午节",
  	"20210919": "中秋节",
  	"20210920": "中秋节",
  	"20210921": "中秋节",
  	"20211001": "国庆节",
  	"20211002": "国庆节",
  	"20211003": "国庆节",
  	"20211004": "国庆节",
  	"20211005": "国庆节",
  	"20211006": "国庆节",
  	"20211007": "国庆节",
  	"20220101": "元旦",
  	"20220102": "元旦",
  	"20220103": "元旦",
  	"20220131": "春节",
  	"20220201": "春节",
  	"20220202": "春节",
  	"20220203": "春节",
  	"20220204": "春节",
  	"20220205": "春节",
  	"20220206": "春节",
  	"20220403": "清明节",
  	"20220404": "清明节",
  	"20220405": "清明节",
  	"20220430": "劳动节",
  	"20220501": "劳动节",
  	"20220502": "劳动节",
  	"20220503": "劳动节",
  	"20220504": "劳动节",
  	"20220603": "端午节",
  	"20220604": "端午节",
  	"20220605": "端午节",
  	"20220910": "中秋节",
  	"20220911": "中秋节",
  	"20220912": "中秋节",
  	"20221001": "国庆节",
  	"20221002": "国庆节",
  	"20221003": "国庆节",
  	"20221004": "国庆节",
  	"20221005": "国庆节",
  	"20221006": "国庆节",
  	"20221007": "国庆节",
  	"20221231": "元旦",
  	"20230101": "元旦",
  	"20230102": "元旦",
  	"20230121": "春节",
  	"20230122": "春节",
  	"20230123": "春节",
  	"20230124": "春节",
  	"20230125": "春节",
  	"20230126": "春节",
  	"20230127": "春节",
  	"20230405": "清明节",
  	"20230429": "劳动节",
  	"20230430": "劳动节",
  	"20230501": "劳动节",
  	"20230502": "劳动节",
  	"20230503": "劳动节",
  	"20230622": "端午节",
  	"20230623": "端午节",
  	"20230624": "端午节",
  	"20230929": "中秋节",
  	"20230930": "国庆节",
  	"20231001": "国庆节",
  	"20231002": "国庆节",
  	"20231003": "国庆节",
  	"20231004": "国庆节",
  	"20231005": "国庆节",
  	"20231006": "国庆节",
  	"20240101": "元旦",
  	"20240210": "春节",
  	"20240211": "春节",
  	"20240212": "春节",
  	"20240213": "春节",
  	"20240214": "春节",
  	"20240215": "春节",
  	"20240216": "春节",
  	"20240217": "春节",
  	"20240404": "清明节",
  	"20240405": "清明节",
  	"20240406": "清明节",
  	"20240501": "劳动节",
  	"20240502": "劳动节",
  	"20240503": "劳动节",
  	"20240504": "劳动节",
  	"20240505": "劳动节",
  	"20240608": "端午节",
  	"20240609": "端午节",
  	"20240610": "端午节",
  	"20240915": "中秋节",
  	"20240916": "中秋节",
  	"20240917": "中秋节",
  	"20241001": "国庆节",
  	"20241002": "国庆节",
  	"20241003": "国庆节",
  	"20241004": "国庆节",
  	"20241005": "国庆节",
  	"20241006": "国庆节",
  	"20241007": "国庆节",
  	"20241230": "元旦",
  	"20241231": "元旦"
  };

  var legal = [
  	20070101,
  	20070218,
  	20070219,
  	20070220,
  	20070501,
  	20070502,
  	20070503,
  	20071001,
  	20071002,
  	20071003,
  	20080101,
  	20080206,
  	20080207,
  	20080208,
  	20080404,
  	20080501,
  	20080608,
  	20080914,
  	20081001,
  	20081002,
  	20081003,
  	20090101,
  	20090125,
  	20090126,
  	20090127,
  	20090404,
  	20090501,
  	20090528,
  	20091001,
  	20091002,
  	20091003,
  	20100101,
  	20100213,
  	20100214,
  	20100215,
  	20100405,
  	20100501,
  	20100616,
  	20100922,
  	20101001,
  	20101002,
  	20101003,
  	20110101,
  	20110202,
  	20110203,
  	20110204,
  	20110405,
  	20110501,
  	20110606,
  	20110912,
  	20111001,
  	20111002,
  	20111003,
  	20120101,
  	20120122,
  	20120123,
  	20120124,
  	20120404,
  	20120501,
  	20120623,
  	20120930,
  	20121001,
  	20121002,
  	20121003,
  	20130101,
  	20130209,
  	20130210,
  	20130211,
  	20130404,
  	20130501,
  	20130612,
  	20130919,
  	20131001,
  	20131002,
  	20131003,
  	20140101,
  	20140131,
  	20140201,
  	20140202,
  	20140405,
  	20140501,
  	20140602,
  	20140908,
  	20141001,
  	20141002,
  	20141003,
  	20150101,
  	20150218,
  	20150219,
  	20150220,
  	20150405,
  	20150501,
  	20150620,
  	20150927,
  	20151001,
  	20151002,
  	20151003,
  	20160101,
  	20160207,
  	20160208,
  	20160209,
  	20160404,
  	20160501,
  	20160609,
  	20160915,
  	20161001,
  	20161002,
  	20161003,
  	20170101,
  	20170127,
  	20170128,
  	20170129,
  	20170404,
  	20170501,
  	20170530,
  	20171001,
  	20171002,
  	20171003,
  	20171004,
  	20180101,
  	20180216,
  	20180217,
  	20180218,
  	20180405,
  	20180501,
  	20180618,
  	20180924,
  	20181001,
  	20181002,
  	20181003,
  	20190101,
  	20190205,
  	20190206,
  	20190207,
  	20190405,
  	20190501,
  	20190607,
  	20190913,
  	20191001,
  	20191002,
  	20191003,
  	20200101,
  	20200125,
  	20200126,
  	20200127,
  	20200404,
  	20200501,
  	20200625,
  	20201001,
  	20201002,
  	20201003,
  	20201004,
  	20210101,
  	20210212,
  	20210213,
  	20210214,
  	20210404,
  	20210501,
  	20210614,
  	20210921,
  	20211001,
  	20211002,
  	20211003,
  	20220101,
  	20220201,
  	20220202,
  	20220203,
  	20220405,
  	20220501,
  	20220603,
  	20220910,
  	20221001,
  	20221002,
  	20221003,
  	20230101,
  	20230122,
  	20230123,
  	20230124,
  	20230405,
  	20230501,
  	20230622,
  	20230929,
  	20231001,
  	20231002,
  	20231003,
  	20240101,
  	20240210,
  	20240211,
  	20240212,
  	20240404,
  	20240501,
  	20240610,
  	20240917,
  	20241001,
  	20241002,
  	20241003
  ];

  var swap = [
  	20070217,
  	20070225,
  	20070428,
  	20070429,
  	20070929,
  	20070930,
  	20071229,
  	20080202,
  	20080203,
  	20080504,
  	20080927,
  	20080928,
  	20090104,
  	20090124,
  	20090201,
  	20090531,
  	20091010,
  	20091027,
  	20100220,
  	20100221,
  	20100612,
  	20100613,
  	20100919,
  	20100925,
  	20100926,
  	20101009,
  	20110130,
  	20110212,
  	20110402,
  	20111008,
  	20111009,
  	20111231,
  	20120121,
  	20120129,
  	20120331,
  	20120401,
  	20120428,
  	20120929,
  	20130105,
  	20130106,
  	20130216,
  	20130217,
  	20130407,
  	20130427,
  	20130428,
  	20130608,
  	20130609,
  	20130922,
  	20130929,
  	20131012,
  	20140126,
  	20140208,
  	20140504,
  	20140928,
  	20141011,
  	20150104,
  	20150215,
  	20150228,
  	20151010,
  	20160206,
  	20160214,
  	20160612,
  	20160918,
  	20161008,
  	20161009,
  	20170122,
  	20170204,
  	20170401,
  	20170527,
  	20170930,
  	20180211,
  	20180224,
  	20180408,
  	20180428,
  	20180929,
  	20180930,
  	20181229,
  	20190202,
  	20190203,
  	20190428,
  	20190505,
  	20190929,
  	20191012,
  	20200119,
  	20200426,
  	20200509,
  	20200628,
  	20200927,
  	20201010,
  	20210207,
  	20210220,
  	20210425,
  	20210508,
  	20210918,
  	20210926,
  	20211009,
  	20220129,
  	20220130,
  	20220402,
  	20220424,
  	20220507,
  	20221008,
  	20221009,
  	20230128,
  	20230129,
  	20230423,
  	20230506,
  	20230625,
  	20231007,
  	20231008,
  	20240204,
  	20240217,
  	20240407,
  	20240427,
  	20240428,
  	20240928,
  	20240929
  ];

  const holidayMap = new Map(Object.entries(holiday).map(([dateStr, name]) => [Number(dateStr), name]));
  const legalSet = new Set(legal.map((date) => Number(date)));
  const swapSet = new Set(swap.map((date) => Number(date)));

  class Festival {
    constructor() {
      this.proxy = new Proxy(
        { startDate: 20070101, endDate: 20231230 },
        {
          get: function (target, prop) {
            return target[prop]
          },
          set: function (target, prop, value) {
            if (!Number.isNaN(Number(value))) {
              target[prop] = Number(value);
              return true
            }
            return false
          }
        }
      );
      this.cache = new Map();
    }

    isValidDate(date) {
      return date >= this.proxy.startDate && date <= this.proxy.endDate
    }

    getDayInfo(date) {
      if (!this.isValidDate(date)) {
        return 'invalid'
      }
      if (this.cache.has(date)) {
        return this.cache.get(date)
      }
      const holiday = holidayMap.get(date) || '非假期';
      const isLegal = legalSet.has(date);
      const isSwap = swapSet.has(date);
      const isHoliday = holiday !== '非假期';
      const result = { date, name: holiday, isHoliday, isLegal, isSwap };
      this.cache.set(date, result);
      return result
    }

    getHolidayName(date) {
      return holidayMap.get(date) || '非假期'
    }

    getHolidaySet() {
      return new Set(Object.keys(holiday).map((dateStr) => Number(dateStr)))
    }

    isLegalHoliday(date) {
      return legalSet.has(date)
    }

    isSwapHoliday(date) {
      return swapSet.has(date)
    }

    // 对外暴露的方法
    day(date) {
      return this.getDayInfo(Number(date))
    }

    name(date) {
      return this.getHolidayName(Number(date))
    }

    isHoliday(date) {
      return this.getDayInfo(Number(date)).isHoliday
    }

    isLegal(date) {
      return this.isLegalHoliday(Number(date))
    }

    isSwap(date) {
      return this.isSwapHoliday(Number(date))
    }

    getDaysInRange(start, end) {
      const result = [];
      const startDate = Math.max(start, this.proxy.startDate);
      const endDate = Math.min(end, this.proxy.endDate);

      for (let date = startDate; date <= endDate; date++) {
        result.push(this.getDayInfo(date));
      }

      return result
    }

    getLegalHolidaysInRange(start, end) {
      const result = [];
      const startDate = Math.max(start, this.proxy.startDate);
      const endDate = Math.min(end, this.proxy.endDate);

      for (let date = startDate; date <= endDate; date++) {
        if (legalSet.has(date)) {
          result.push(this.getDayInfo(date));
        }
      }

      return result
    }

    getSwapHolidaysInRange(start, end) {
      const result = [];
      const startDate = Math.max(start, this.proxy.startDate);
      const endDate = Math.min(end, this.proxy.endDate);

      for (let date = startDate; date <= endDate; date++) {
        if (swapSet.has(date)) {
          result.push(this.getDayInfo(date));
        }
      }

      return result
    }

    /**
     * 查询指定日期范围内的假期天数
     * @param {Date} start 开始日期
     * @param {Date} end 结束日期
     * @returns {number} 假期天数
     */
    countHolidaysInRange(start, end) {
      // 限制开始日期和结束日期在节假日定义范围内
      const startDate = Math.max(start, this.proxy.startDate);
      const endDate = Math.min(end, this.proxy.endDate);
      let count = 0;
      // 计算假期天数
      for (let date = startDate; date <= endDate; date++) {
        if (this.getDayInfo(date).isHoliday) {
          count++;
        }
      }
      return count
    }
  }

  var index = new Festival();

  return index;

}));
//# sourceMappingURL=festival.js.map
