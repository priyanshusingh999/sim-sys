from app import app


def test_pages_load_successfully():
    client = app.test_client()

    routes = [
        ("/", "ProjectAI"),
        ("/dashboard", "Project Overview"),
        ("/documents", "Project Documents"),
        ("/schedule", "Project Schedule"),
        ("/progress", "Progress Monitoring"),
        ("/risks", "Risks & Delays"),
        ("/assistant", "AI Project Assistant"),
    ]

    for url, expected_text in routes:
        response = client.get(url)
        assert response.status_code == 200, f"{url} failed with status {response.status_code}"
        assert expected_text.encode() in response.data, f"{url} did not contain expected text: {expected_text}"
