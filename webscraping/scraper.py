from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
import json
import random
from urllib.parse import quote


class CrunchbaseScraper:
    def __init__(self, scraper_api_key):
        self.scraper_api_key = scraper_api_key
        self.setup_driver()

    def setup_driver(self):
        """Setup Chrome driver with proper options"""
        options = Options()
        options.add_argument("--headless")
        options.add_argument("--disable-gpu")  # Required for headless mode
        options.add_argument("--no-sandbox")
        options.add_argument("--disable-dev-shm-usage")
        options.add_argument("--disable-infobars")
        options.add_argument("--disable-extensions")
        options.add_argument("--disable-notifications")

        # Disable logging
        options.add_experimental_option("excludeSwitches", ["enable-logging"])

        # Setup service
        service = Service(ChromeDriverManager().install())

        try:
            self.driver = webdriver.Chrome(service=service, options=options)
        except Exception as e:
            print(f"Error setting up Chrome driver: {str(e)}")
            raise

    def scrape_organization(self, org_url):
        """Scrape a single organization page with better error handling"""
        try:
            api_url = self.get_scraper_api_url(org_url)
            print(f"Scraping: {org_url}")

            self.driver.get(api_url)
            time.sleep(5)  # Give time for the page to load

            # Wait for the main content to load
            wait = WebDriverWait(self.driver, 20)

            # Extract data with explicit waits
            org_data = {
                "url": org_url,
                "name": self.safe_extract_with_wait("profile-name", wait),
                "description": self.safe_extract_with_wait("description-card", wait),
                "website": self.safe_extract_with_wait("website-link", wait),
                "headquarters": self.safe_extract_with_wait("location-card", wait),
                "founded_date": self.safe_extract_with_wait("founded_on", wait),
                "employees": self.safe_extract_with_wait("company-size-card", wait),
                "funding": self.safe_extract_with_wait("funding-rounds-card", wait),
            }

            print(f"Successfully scraped: {org_data.get('name', 'Unknown')}")
            return org_data

        except Exception as e:
            print(f"Error scraping {org_url}: {str(e)}")
            return None

    def safe_extract_with_wait(self, class_name, wait):
        """Safely extract text with explicit wait"""
        try:
            element = wait.until(
                EC.presence_of_element_located((By.CLASS_NAME, class_name))
            )
            return element.text.strip()
        except:
            return None

    def get_scraper_api_url(self, url):
        """Convert regular URL to Scraper API URL"""
        return f"http://api.scraperapi.com?api_key={self.scraper_api_key}&url={quote(url)}&render=true"

    def close(self):
        """Safely close the browser"""
        try:
            if hasattr(self, "driver"):
                self.driver.quit()
        except Exception as e:
            print(f"Error closing driver: {str(e)}")


def main():
    # Your Scraper API key
    SCRAPER_API_KEY = "5fbfdd932e63df5800f71cd5eeadd8b2"

    # Test with a few URLs first
    test_urls = [
        "https://www.crunchbase.com/organization/microsoft",
        "https://www.crunchbase.com/organization/google",
        "https://www.crunchbase.com/organization/apple",
    ]

    results = []
    scraper = None

    try:
        scraper = CrunchbaseScraper(SCRAPER_API_KEY)

        for url in test_urls:
            data = scraper.scrape_organization(url)
            if data:
                results.append(data)
                # Save after each successful scrape
                with open("crunchbase_data.json", "w", encoding="utf-8") as f:
                    json.dump(results, f, indent=2, ensure_ascii=False)

            # Random delay between requests
            delay = random.uniform(2, 5)
            time.sleep(delay)

    except Exception as e:
        print(f"Main error: {str(e)}")
    finally:
        if scraper:
            scraper.close()

    print(f"Successfully scraped {len(results)} organizations")


if __name__ == "__main__":
    main()
