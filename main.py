num1 = int(input("Введите делимое:"), 16)
num2 = int(input("Введите делитель:"), 16)

num_hex1 = hex(num1)
num_hex2 = hex(num2)
print(f"Делимое в 16 системе {num_hex1}")
print(f"Делитель в 16 системе {num_hex2}")

num_bin1 = bin(num1)
num_bin2 = bin(num2)
print(f"Делимое в 16 системе {num_bin1}")
print(f"Делитель в 16 системе {num_bin2}")

def DesnotRec (bin1, bin2):
    result = 0
    bin2 <<= 4
    for i in range(1, 6):
        if bin1 > 0:
            bin1 = bin1 - bin2
        elif bin1 > 0:
            bin1 = bin1 + bin2
        if bin1 >= 0:
            result <<= 1
            result += 1
        else:
            result <<= 1
        bin1 <<= 1
    return result

print(ALU = DesnotRec(num_bin1, num_bin2))

def DesRec (bin1, bin2) :
    result = 0
    return result