import MySQLdb
conn = MySQLdb.connect('127.0.0.1', 'root', 'dangjian666', 'collect', charset='utf8')
cur = conn.cursor()
sql = '''truncate table news'''
cur.execute(sql)
cur.close()
conn.close()