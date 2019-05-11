# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://doc.scrapy.org/en/latest/topics/item-pipeline.html
import MySQLdb
class CollectCrawlPipeline(object):
    def __init__(self):
        self.conn = MySQLdb.connect('127.0.0.1', 'root', 'dangjian666', 'collect', charset='utf8')
        self.cur = self.conn.cursor()
        #self.sponsorFile = open("./collect_crawl/data/news.json","ab+")
        #self.exporter = JsonLinesItemExporter(self.sponsorFile,encoding="utf-8",ensure_ascii=False)
        #self.exporter.start_exporting()
    def process_item(self, item, spider):
            sql = '''INSERT INTO news(TITLE, URL, TYPE) VALUES ("{}", "{}", "{}")'''.format(item['title'], item['url'], item['type'])
            self.cur.execute(sql)
            self.conn.commit()
            return item
    def close_spider(self,spider):
        #self.exporter.finish_exporting()
        #self.sponsorFile.close()
        self.cur.close()
        self.conn.close()