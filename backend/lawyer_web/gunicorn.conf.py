bind = "0.0.0.0:8000"
workers = 4
worker_class = "sync"
timeout = 120
max_requests = 500
accesslog = "-"  # логировать запросы в stdout
errorlog = "-"   # логировать ошибки в stdout