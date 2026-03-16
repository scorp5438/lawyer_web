import logging

import requests

console_logger = logging.getLogger("console_logger")
file_logger = logging.getLogger("file_logger")

class BaseGeocoder:
    @staticmethod
    def geocode(address):
        pass


class PhotonGeocoder(BaseGeocoder):
    @staticmethod
    def geocode(address):
        try:
            headers = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36'
            }
            response = requests.get(
                'https://photon.komoot.io/api/',
                params={'q': address},
                headers=headers,
                timeout=5
            )

            data = response.json()
            if data['features']:
                console_logger.info(data['features'][0]['geometry']['coordinates'][::-1])
                return data['features'][0]['geometry']['coordinates'][::-1]  # [долгота, широта] → [широта, долгота]
        except Exception as e:
            file_logger.error(f"Ошибка: {e}")
            return None, None


class YandexGeocoder(BaseGeocoder):
    pass


if __name__ == '__main__':

    geo = PhotonGeocoder()
    coord = geo.geocode('Московская область, Москва')
    print(coord)
