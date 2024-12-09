class CustomException(Exception):
    def __init__(self, error_code: int, message: str, details: str) -> None:
        super().__init__(message)
        self.error_code = error_code
        self.message = message
        self.details = details
