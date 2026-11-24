---
title: CloudBox
slug: cloudbox
wing: systems
year: 2026
status: shipped
plaque: "FastAPI, PostgreSQL, Docker. Resumable uploads."
problem: "An interrupted upload left the quota and the files disagreeing about what the user owned."
decision: "Reserve the quota when the session opens, and release it from a separate worker when the session expires."
result: "The API and the worker are covered by 70 pytest tests. There is no interface and no public demo."
stack:
  - FastAPI
  - PostgreSQL
  - Docker
  - pytest
links:
  repo: https://github.com/kha-adam/cloudbox
featured: true
---

A file is not one request. The client opens a session, sends chunks, and closes the file only when every chunk has arrived. The quota is taken at the opening, so two uploads cannot both claim the last of a user's space. When a session expires, a worker outside the API deletes the temporary data and returns that space.
