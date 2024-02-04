use directories::BaseDirs;
use std::os::unix::process::CommandExt;
use std::process::Command;
use std::io::{self, BufRead, Read, Write};
use std::fs::{self, File};


fn get_name_from_file() -> Result<String, ()> {
    if let Some(base_dirs) = BaseDirs::new() {
        let dir = base_dirs.data_dir();
        let dir = dir.join("sl");

        let mut file = File::open(dir.join("username")).map_err(|_| ())?;

        let mut out = String::new();

        file.read_to_string(&mut out).map_err(|_| ())?;

        Ok(out)
    } else {
        Err(())
    }
}

fn get_name() -> String {
    match get_name_from_file() {
        Ok(s) => s,
        Err(_) => {
            println!("What is your username? ");
            let line1 = io::stdin().lock().lines().next().unwrap().unwrap();

            if let Some(base_dirs) = BaseDirs::new() {
                let dir = base_dirs.data_dir();
                let dir = dir.join("sl");

                let _  = fs::create_dir(dir.clone());


                let mut file = File::create(dir.join("username")).unwrap();

                file.write_all(line1.as_bytes()).unwrap();

            };

            line1
        }
    }
}

fn send_request(name: String) {
    let _ = reqwest::blocking::get(format!("https://sl.vector-sub.space/api/sl?user={}", name)).unwrap().text().unwrap();
}

fn main() {
    let name = get_name();
    send_request(name);

    Command::new("/usr/bin/sl").exec();


}
