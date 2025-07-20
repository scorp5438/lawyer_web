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
            response = requests.get(
                'https://photon.komoot.io/api/',
                params={'q': address}
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
