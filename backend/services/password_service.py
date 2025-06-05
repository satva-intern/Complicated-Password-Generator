import random
import string
from config.settings import SPECIAL_CHARS

#true by default
def generate_password(length=12, include_upper=1, include_lower=1, 
                     include_digits=1, include_special=1):
    chars = ""
    password = []

    if include_upper:
        chars += string.ascii_uppercase
        password.append(random.choice(string.ascii_uppercase))
    if include_lower:
        chars += string.ascii_lowercase
        password.append(random.choice(string.ascii_lowercase))
    if include_digits:
        chars += string.digits
        password.append(random.choice(string.digits))
    if include_special:
        chars += SPECIAL_CHARS
        password.append(random.choice(SPECIAL_CHARS))

    if not chars:
        return "Error: At least one character type must be included."

    while len(password) < length:
        password.append(random.choice(chars))

    random.shuffle(password)
    return "".join(password)

def check_rules(pwd, include_upper=1, include_lower=1, include_digits=1):
    if include_upper and not any(c.isupper() for c in pwd):
        return False
    if include_lower and not any(c.islower() for c in pwd):
        return False
    if include_digits and not any(c.isdigit() for c in pwd):
        return False
    return True

def check_strength(pwd):
    score = 0
    if len(pwd) >= 8: score += 1
    if any(c.islower() for c in pwd): score += 1
    if any(c.isupper() for c in pwd): score += 1
    if any(c.isdigit() for c in pwd): score += 1
    if any(c in SPECIAL_CHARS for c in pwd): score += 1

    return score, get_strength_label(score)

def get_strength_label(score):
    return {
        0: "Very Weak",
        1: "Weak",
        2: "Weak",
        3: "Medium",
        4: "Strong",
        5: "Very Strong"
    }.get(score, "Weak")
