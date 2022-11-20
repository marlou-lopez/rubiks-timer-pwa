#!/usr/bin/env python3

import sys;
import urllib.request
import os

alg_file = sys.argv[1]
filename = alg_file.split('.')[0]
vc_url = 'http://localhost:8080/visualcube.php?fmt=svg&size=100&view=plan&case='
vc_url_f2l = 'http://localhost:8080/visualcube.php?fmt=svg&size=100&stage=f2l&case='
algs_list = []

with open(alg_file, 'r') as algs_from_file:
  algs = algs_from_file.readlines()
  for alg in algs:
    splitted_arg = alg.split('=')
    alg_name = splitted_arg[0]
    case = splitted_arg[1].replace(' ', '').strip()
    case_url = vc_url + case
    filepath = './public/images/algs_set/' + os.path.basename(filename)
    if not os.path.exists(filepath):
      os.makedirs(filepath)

    image_name = filepath + '/' + alg_name + '.svg'
    
    if not os.path.isfile(image_name):
      urllib.request.urlretrieve(case_url, image_name)