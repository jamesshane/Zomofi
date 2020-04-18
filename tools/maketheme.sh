
IFS=$'\n'
arrOne=`find ../assets/img/background/themes -maxdepth 1 -printf "%f\n"`
readarray -t dirarr <<<"$arrOne"

# echo ${#dirarr[@]} # will echo number of elements in array
# echo "${dirarr[@]}" # will dump all elements of the array
# IFS=$','
# echo "${dirarr[*]}" # will dump all elements of the array
imageslist=()
for (( i=1; i<${#dirarr[@]}; i++ ))
do
    # echo "$i: ${dirarr[$i]}"

    IFS=$'\n'
    arrOne=`find ../assets/img/background/themes/${dirarr[$i]} -maxdepth 1 -printf "'%f'\n"`
    readarray -t filearr <<<"$arrOne"

    # echo ${#filearr[@]} # will echo number of elements in array
    # echo "${filearr[@]}" # will dump all elements of the array

    filearr=("${filearr[@]:1}")
    IFS=$','
    # echo "${dirarr[$i]}:[${filearr[*]}]" # will dump all elements of the array

    imageslist+=("${dirarr[$i]}:[${filearr[*]}]")
done

# echo "${#imageslist[@]}"
# echo "${imageslist[@]}"

    IFS=$','
    echo "${imageslist[*]}" # will dump all elements of the array


# {urban:['graffiti.jpg', 'hero-bg.jpg','wall.jpg'],