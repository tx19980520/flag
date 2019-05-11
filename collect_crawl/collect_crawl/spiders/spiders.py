# -*- coding: utf-8 -*-
import scrapy
import collect_crawl.items as Item
class JwcSpider(scrapy.Spider):
    name="jwc_crawl"
    allowed_domains = ["jwc.sjtu.edu.cn.com"]
    start_urls=["http://jwc.sjtu.edu.cn/web/sjtu/198001.htm"]
    def __init__(self):
        super(scrapy.Spider,self).__init__()
    def parse(self,response):
        if response.status == 200:
            urls = response.xpath("/html/body/table[5]//td[1]//table[1]//tr[2]//tr[@class='main_r_xuxian']//a[@target='_blank']/@href")
            titles = response.xpath("/html/body/table[5]//td[1]//table[1]//tr[2]//tr[@class='main_r_xuxian']//a[@target='_blank']/text()")
            for url, title in zip(urls, titles):
                item = Item.CollectCrawlItem()
                item['title'] = title.extract()
                item['url'] = url.extract()
                item['type'] = 'jwc'
                yield item
class XsbSpider(scrapy.Spider):
    name="xsb_crawl"
    allowed_domains = ["xsb.seiee.sjtu.edu.cn"]
    start_urls=["http://xsb.seiee.sjtu.edu.cn/xsb/list/611-1-20.htm"]
    def __init__(self):
        super(scrapy.Spider,self).__init__()
    def parse(self,response):
        if response.status == 200:
            urls = response.xpath('//*[@id="layout11"]/div/div[2]/ul/li/a/@href')
            titles = response.xpath('//*[@id="layout11"]/div/div[2]/ul/li/a/@title')
            for url, title in zip(urls, titles):
                item = Item.CollectCrawlItem()
                item['title'] = title.extract()
                item['url'] = url.extract()
                item['type'] = 'xsb'
                yield item