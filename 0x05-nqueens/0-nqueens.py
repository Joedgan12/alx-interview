#!/usr/bin/python3
""" N queens puzzle, challenge of placing N non attacking queens
on a NxN chessboard
This program solves the N queens problem """

from sys import argv


def is_NQueen(cell: list) -> bool:
    """ False if not N Queen, True if N Queen """
    row_number = len(cell) - 1
    differenc = 0
    for index in range(0, row_number):
        differenc = cell[index] - cell[row_number]
        if differenc < 0:
            differenc *= -1
        if differenc == 0 or differenc == row_number - index:
            return False
    return True


def solve_NQueens(dim: int, row: int, cell: list, output: list):
    """ Return result of N Queens recursively """
    if row == dim:
        print(output)
    else:
        for column in range(0, dim):
            cell.append(column)
            output.append([row, column])
            if (is_NQueen(cell)):
                solve_NQueens(dim, row + 1, cell, output)
            cell.pop()
            output.pop()


if len(argv) != 2:
    print('Usage: nqueens N')
    exit(1)
try:
    N = int(argv[1])
except BaseException:
    print('N must be a number')
    exit(1)
if N < 4:
    print('N must be at least 4')
    exit(1)
else:
    output = []
    cell = 0
    solve_NQueens(int(N), cell, [], output)
