package com.test.mymovies.activity;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.GridLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.app.AlertDialog;
import android.app.ProgressDialog;
import android.app.SearchManager;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.net.ConnectivityManager;
import android.os.AsyncTask;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.util.Log;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.View;
import android.widget.SearchView;
import android.widget.TextView;
import android.widget.Toast;

import com.test.mymovies.adapter.MoviesAdapter;
import com.test.mymovies.model.MoviesList;
import com.test.mymovies.R;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;

public class MainActivity extends AppCompatActivity{

    // Variables
    private RecyclerView recyclerView;
    public static Context context;
    private SharedPreferences mPrefs;
    private SharedPreferences.Editor prefsEditor;
    private TextView error;
    private ArrayList<MoviesList> moviesLists;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // add variable to fields
        recyclerView = findViewById(R.id.rv_main_movies);
        error = findViewById(R.id.tv_main_error);

        error.setVisibility(View.GONE);

        recyclerView.setLayoutManager(new GridLayoutManager(this, 2));
        recyclerView.setHasFixedSize(true);

        context = this;

        // Create a shared preferences
        mPrefs = getPreferences(MODE_PRIVATE);
        prefsEditor = mPrefs.edit();

        // Checks if network is available
        if(isNetworkAvailable(context)) {
            //Toast.makeText(context, "Connected to the internet", Toast.LENGTH_LONG).show();
            new downloadData().execute();
        }else {
            //Toast.makeText(context,"No internet connection", Toast.LENGTH_LONG).show();

            String movies = mPrefs.getString("movies", "");
            if(movies == null || movies.equals("")) {
                error.setVisibility(View.VISIBLE);
            }else{
                moviesLists = getMovies(movies,"nointernet","");
                MoviesAdapter moviesAdapter = new MoviesAdapter(getApplicationContext(), moviesLists);
                recyclerView.setAdapter(moviesAdapter);
            }
        }

    }

    // Funciton checks if network is available
    private boolean isNetworkAvailable(Context context) {
        ConnectivityManager connectivityManager = ((ConnectivityManager) context.getSystemService(Context.CONNECTIVITY_SERVICE));
        return connectivityManager.getActiveNetworkInfo() != null && connectivityManager.getActiveNetworkInfo().isConnected();
    }

    // Menu Options
    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        MenuInflater inflater = getMenuInflater();
        inflater.inflate(R.menu.option_menu, menu);

        // Get the SearchView and set the searchable configuration
        SearchManager searchManager = (SearchManager) getSystemService(Context.SEARCH_SERVICE);
        SearchView searchView = (SearchView) menu.findItem(R.id.app_bar_search).getActionView();
        // Assumes current activity is the searchable activity
        searchView.setSearchableInfo(searchManager.getSearchableInfo(getComponentName()));
        searchView.setMaxWidth(Integer.MAX_VALUE);

        // Checks if user typed in seachview
        searchView.setOnQueryTextListener(new SearchView.OnQueryTextListener() {
            @Override
            public boolean onQueryTextSubmit(String query) {
                return false;
            }

            @Override
            public boolean onQueryTextChange(String newText) {

                String movies = mPrefs.getString("movies", "");
                ArrayList<MoviesList> movieList = getMovies(movies,"search", newText);
                MoviesAdapter adapter = new MoviesAdapter(getApplicationContext(), movieList);
                recyclerView.setLayoutManager(new GridLayoutManager(getApplicationContext(), 2));
                recyclerView.setAdapter(adapter);
                return false;
            }
        });

        return true;

    }

    // Get data from HTML
    class downloadData extends AsyncTask<Void, Void, ArrayList<MoviesList>>{

        ProgressDialog dialog;

        @Override
        protected void onPreExecute() {
            super.onPreExecute();
            dialog = ProgressDialog.show(MainActivity.this, "Wait","Loading, Please wait...");
        }

        @Override
        protected ArrayList<MoviesList> doInBackground(Void... urls ) {
            HttpURLConnection urlConnection = null;
            BufferedReader reader = null;
            try {
                URL url = new URL("https://desafio-mobile.nyc3.digitaloceanspaces.com/movies");
                urlConnection = (HttpURLConnection) url.openConnection();
                urlConnection.setRequestMethod("GET");
                urlConnection.connect();
                InputStream inputStream = urlConnection.getInputStream();
                reader = new BufferedReader(new InputStreamReader(inputStream));
                String linha;
                StringBuffer buffer = new StringBuffer();
                while((linha = reader.readLine()) != null) {
                    buffer.append(linha);
                    buffer.append("\n");
                }

                prefsEditor.putString("movies", buffer.toString());
                prefsEditor.commit();
                moviesLists = getMovies(buffer.toString(), "download","");

                return moviesLists;
            } catch (Exception e) {
                e.printStackTrace();
                if (urlConnection != null) {
                    urlConnection.disconnect();
                }
                if (reader != null) {
                    try {
                        reader.close();
                    } catch (IOException e1) {
                        e1.printStackTrace();
                    }
                }
            }
            return null;
        }
        @Override
        protected void onPostExecute(ArrayList<MoviesList> data) {

            dialog.dismiss();
            if (data.size() > 0) {
                MoviesAdapter moviesAdapter = new MoviesAdapter(getApplicationContext(), data);
                recyclerView.setAdapter(moviesAdapter);
            } else {
                AlertDialog.Builder builder = new AlertDialog.Builder(
                        MainActivity.this).setTitle("Atention")
                        .setMessage("It was not possible to access this information...")
                        .setPositiveButton("OK", null);
                builder.create().show();
            }

        }

    }

    // Function get movies from json
    private ArrayList<MoviesList> getMovies(String data, String choice, String value){

        ArrayList<MoviesList> moviesLists = new ArrayList<>();

        try {
            JSONArray arraylists = new JSONArray(data);

            JSONObject object;

            for (int i = 0; i < arraylists.length(); i++) {
                object = new JSONObject(arraylists.getString(i));

                MoviesList movie = new MoviesList();
                if (choice.contains("search")){
                    if (object.getString("title").toLowerCase().contains(value)) {
                        addMovie(movie, object);
                        moviesLists.add(movie);
                    }
                }else {
                    addMovie(movie, object);
                    moviesLists.add(movie);
                }

            }

        } catch (JSONException e) {
            Log.e("ex", "Error parsing JSON", e);
            Toast.makeText(context, "Error downloading data.",Toast.LENGTH_LONG).show();
        }

        return moviesLists;
    }

    // Function add data from movies to model
    private MoviesList addMovie(MoviesList movie, JSONObject object){

        try {
            movie.setId(object.getInt("id"));
            movie.setTitle(object.getString("title"));
            movie.setPoster_url(object.getString("poster_url"));
            movie.setRelease_date(object.getString("release_date"));
            movie.setVote_average(Float.parseFloat(object.getString("vote_average")));
            movie.setGenres(object.getJSONArray("genres"));
        } catch (JSONException e) {
            e.printStackTrace();
        }

        return movie;
    }


    // Construction and configuration of the handler
    public static Handler handler = new Handler() {

        @Override
        public void handleMessage(Message msg) {
            Bundle bundle = msg.getData();

            String json = bundle.getString("movie");
            String id = bundle.getString("id");

            Intent intent = new Intent(context, MoviesActivity.class);
            intent.putExtra("json",json);
            intent.putExtra("id",id);
            context.startActivity(intent);
        }

    };

}
